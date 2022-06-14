'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 * IMPORTANT: all calls of this function must be prefixed with
 * \/\*#\_\_PURE\_\_\*\/
 * So that rollup can tree-shake them if necessary.
 */
function makeMap(str, expectsLowerCase) {
  const map = Object.create(null);
  const list = str.split(',');

  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }

  return expectsLowerCase ? val => !!map[val.toLowerCase()] : val => !!map[val];
}

function normalizeStyle(value) {
  if (isArray(value)) {
    const res = {};

    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);

      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }

    return res;
  } else if (isString(value)) {
    return value;
  } else if (isObject(value)) {
    return value;
  }
}

const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:(.+)/;

function parseStringStyle(cssText) {
  const ret = {};
  cssText.split(listDelimiterRE).forEach(item => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}

function normalizeClass(value) {
  let res = '';

  if (isString(value)) {
    res = value;
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);

      if (normalized) {
        res += normalized + ' ';
      }
    }
  } else if (isObject(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + ' ';
      }
    }
  }

  return res.trim();
}

const EMPTY_OBJ = process.env.NODE_ENV !== 'production' ? Object.freeze({}) : {};
const EMPTY_ARR = process.env.NODE_ENV !== 'production' ? Object.freeze([]) : [];

const NOOP = () => {};

const onRE = /^on[^a-z]/;

const isOn = key => onRE.test(key);

const extend = Object.assign;

const remove = (arr, el) => {
  const i = arr.indexOf(el);

  if (i > -1) {
    arr.splice(i, 1);
  }
};

const hasOwnProperty = Object.prototype.hasOwnProperty;

const hasOwn = (val, key) => hasOwnProperty.call(val, key);

const isArray = Array.isArray;

const isMap = val => toTypeString(val) === '[object Map]';

const isSet = val => toTypeString(val) === '[object Set]';

const isFunction = val => typeof val === 'function';

const isString = val => typeof val === 'string';

const isSymbol = val => typeof val === 'symbol';

const isObject = val => val !== null && typeof val === 'object';

const isPromise = val => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};

const objectToString = Object.prototype.toString;

const toTypeString = value => objectToString.call(value);

const toRawType = value => {
  // extract "RawType" from strings like "[object RawType]"
  return toTypeString(value).slice(8, -1);
};

const isPlainObject = val => toTypeString(val) === '[object Object]';

const isIntegerKey = key => isString(key) && key !== 'NaN' && key[0] !== '-' && '' + parseInt(key, 10) === key;

const cacheStringFunction = fn => {
  const cache = Object.create(null);
  return str => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
/**
 * @private
 */

const capitalize = cacheStringFunction(str => str.charAt(0).toUpperCase() + str.slice(1));
/**
 * @private
 */

const toHandlerKey = cacheStringFunction(str => str ? `on${capitalize(str)}` : ``); // compare whether a value has changed, accounting for NaN.

const hasChanged = (value, oldValue) => !Object.is(value, oldValue);

const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};

let _globalThis;

const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {});
};

let activeEffectScope;

function recordEffectScope(effect, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect);
  }
}

const createDep = effects => {
  const dep = new Set(effects);
  dep.w = 0;
  dep.n = 0;
  return dep;
};

const wasTracked = dep => (dep.w & trackOpBit) > 0;

const newTracked = dep => (dep.n & trackOpBit) > 0;

const initDepMarkers = ({
  deps
}) => {
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].w |= trackOpBit; // set was tracked
    }
  }
};

const finalizeDepMarkers = effect => {
  const {
    deps
  } = effect;

  if (deps.length) {
    let ptr = 0;

    for (let i = 0; i < deps.length; i++) {
      const dep = deps[i];

      if (wasTracked(dep) && !newTracked(dep)) {
        dep.delete(effect);
      } else {
        deps[ptr++] = dep;
      } // clear bits


      dep.w &= ~trackOpBit;
      dep.n &= ~trackOpBit;
    }

    deps.length = ptr;
  }
};

const targetMap = new WeakMap(); // The number of effects currently being tracked recursively.

let effectTrackDepth = 0;
let trackOpBit = 1;
/**
 * The bitwise track markers support at most 30 levels of recursion.
 * This value is chosen to enable modern JS engines to use a SMI on all platforms.
 * When recursion depth is greater, fall back to using a full cleanup.
 */

const maxMarkerBits = 30;
let activeEffect;
const ITERATE_KEY = Symbol(process.env.NODE_ENV !== 'production' ? 'iterate' : '');
const MAP_KEY_ITERATE_KEY = Symbol(process.env.NODE_ENV !== 'production' ? 'Map key iterate' : '');

class ReactiveEffect {
  constructor(fn, scheduler = null, scope) {
    this.fn = fn;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    this.parent = undefined;
    recordEffectScope(this, scope);
  }

  run() {
    if (!this.active) {
      return this.fn();
    }

    let parent = activeEffect;
    let lastShouldTrack = shouldTrack;

    while (parent) {
      if (parent === this) {
        return;
      }

      parent = parent.parent;
    }

    try {
      this.parent = activeEffect;
      activeEffect = this;
      shouldTrack = true;
      trackOpBit = 1 << ++effectTrackDepth;

      if (effectTrackDepth <= maxMarkerBits) {
        initDepMarkers(this);
      } else {
        cleanupEffect(this);
      }

      return this.fn();
    } finally {
      if (effectTrackDepth <= maxMarkerBits) {
        finalizeDepMarkers(this);
      }

      trackOpBit = 1 << --effectTrackDepth;
      activeEffect = this.parent;
      shouldTrack = lastShouldTrack;
      this.parent = undefined;
    }
  }

  stop() {
    if (this.active) {
      cleanupEffect(this);

      if (this.onStop) {
        this.onStop();
      }

      this.active = false;
    }
  }

}

function cleanupEffect(effect) {
  const {
    deps
  } = effect;

  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect);
    }

    deps.length = 0;
  }
}

let shouldTrack = true;
const trackStack = [];

function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}

function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === undefined ? true : last;
}

function track(target, type, key) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target);

    if (!depsMap) {
      targetMap.set(target, depsMap = new Map());
    }

    let dep = depsMap.get(key);

    if (!dep) {
      depsMap.set(key, dep = createDep());
    }

    const eventInfo = process.env.NODE_ENV !== 'production' ? {
      effect: activeEffect,
      target,
      type,
      key
    } : undefined;
    trackEffects(dep, eventInfo);
  }
}

function trackEffects(dep, debuggerEventExtraInfo) {
  let shouldTrack = false;

  if (effectTrackDepth <= maxMarkerBits) {
    if (!newTracked(dep)) {
      dep.n |= trackOpBit; // set newly tracked

      shouldTrack = !wasTracked(dep);
    }
  } else {
    // Full cleanup mode.
    shouldTrack = !dep.has(activeEffect);
  }

  if (shouldTrack) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);

    if (process.env.NODE_ENV !== 'production' && activeEffect.onTrack) {
      activeEffect.onTrack(Object.assign({
        effect: activeEffect
      }, debuggerEventExtraInfo));
    }
  }
}

function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);

  if (!depsMap) {
    // never been tracked
    return;
  }

  let deps = [];

  if (type === "clear"
  /* CLEAR */
  ) {
    // collection being cleared
    // trigger all effects for target
    deps = [...depsMap.values()];
  } else if (key === 'length' && isArray(target)) {
    depsMap.forEach((dep, key) => {
      if (key === 'length' || key >= newValue) {
        deps.push(dep);
      }
    });
  } else {
    // schedule runs for SET | ADD | DELETE
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    } // also run for iteration key on ADD | DELETE | Map.SET


    switch (type) {
      case "add"
      /* ADD */
      :
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));

          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          // new index added to array -> length changes
          deps.push(depsMap.get('length'));
        }

        break;

      case "delete"
      /* DELETE */
      :
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));

          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }

        break;

      case "set"
      /* SET */
      :
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }

        break;
    }
  }

  const eventInfo = process.env.NODE_ENV !== 'production' ? {
    target,
    type,
    key,
    newValue,
    oldValue,
    oldTarget
  } : undefined;

  if (deps.length === 1) {
    if (deps[0]) {
      if (process.env.NODE_ENV !== 'production') {
        triggerEffects(deps[0], eventInfo);
      } else {
        triggerEffects(deps[0]);
      }
    }
  } else {
    const effects = [];

    for (const dep of deps) {
      if (dep) {
        effects.push(...dep);
      }
    }

    if (process.env.NODE_ENV !== 'production') {
      triggerEffects(createDep(effects), eventInfo);
    } else {
      triggerEffects(createDep(effects));
    }
  }
}

function triggerEffects(dep, debuggerEventExtraInfo) {
  // spread into array for stabilization
  for (const effect of isArray(dep) ? dep : [...dep]) {
    if (effect !== activeEffect || effect.allowRecurse) {
      if (process.env.NODE_ENV !== 'production' && effect.onTrigger) {
        effect.onTrigger(extend({
          effect
        }, debuggerEventExtraInfo));
      }

      if (effect.scheduler) {
        effect.scheduler();
      } else {
        effect.run();
      }
    }
  }
}

const isNonTrackableKeys = /*#__PURE__*/makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(Object.getOwnPropertyNames(Symbol).map(key => Symbol[key]).filter(isSymbol));
const get = /*#__PURE__*/createGetter();
const readonlyGet = /*#__PURE__*/createGetter(true);
const shallowReadonlyGet = /*#__PURE__*/createGetter(true, true);
const arrayInstrumentations = /*#__PURE__*/createArrayInstrumentations();

function createArrayInstrumentations() {
  const instrumentations = {};
  ['includes', 'indexOf', 'lastIndexOf'].forEach(key => {
    instrumentations[key] = function (...args) {
      const arr = toRaw(this);

      for (let i = 0, l = this.length; i < l; i++) {
        track(arr, "get"
        /* GET */
        , i + '');
      } // we run the method using the original args first (which may be reactive)


      const res = arr[key](...args);

      if (res === -1 || res === false) {
        // if that didn't work, run it again using raw values.
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ['push', 'pop', 'shift', 'unshift', 'splice'].forEach(key => {
    instrumentations[key] = function (...args) {
      pauseTracking();
      const res = toRaw(this)[key].apply(this, args);
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}

function createGetter(isReadonly = false, shallow = false) {
  return function get(target, key, receiver) {
    if (key === "__v_isReactive"
    /* IS_REACTIVE */
    ) {
      return !isReadonly;
    } else if (key === "__v_isReadonly"
    /* IS_READONLY */
    ) {
      return isReadonly;
    } else if (key === "__v_isShallow"
    /* IS_SHALLOW */
    ) {
      return shallow;
    } else if (key === "__v_raw"
    /* RAW */
    && receiver === (isReadonly ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
      return target;
    }

    const targetIsArray = isArray(target);

    if (!isReadonly && targetIsArray && hasOwn(arrayInstrumentations, key)) {
      return Reflect.get(arrayInstrumentations, key, receiver);
    }

    const res = Reflect.get(target, key, receiver);

    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }

    if (!isReadonly) {
      track(target, "get"
      /* GET */
      , key);
    }

    if (shallow) {
      return res;
    }

    if (isRef(res)) {
      // ref unwrapping - does not apply for Array + integer key.
      const shouldUnwrap = !targetIsArray || !isIntegerKey(key);
      return shouldUnwrap ? res.value : res;
    }

    if (isObject(res)) {
      // Convert returned value into a proxy as well. we do the isObject check
      // here to avoid invalid value warning. Also need to lazy access readonly
      // and reactive here to avoid circular dependency.
      return isReadonly ? readonly(res) : reactive(res);
    }

    return res;
  };
}

const set = /*#__PURE__*/createSetter();

function createSetter(shallow = false) {
  return function set(target, key, value, receiver) {
    let oldValue = target[key];

    if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
      return false;
    }

    if (!shallow && !isReadonly(value)) {
      if (!isShallow$1(value)) {
        value = toRaw(value);
        oldValue = toRaw(oldValue);
      }

      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      }
    }

    const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(target, key, value, receiver); // don't trigger if target is something up in the prototype chain of original

    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add"
        /* ADD */
        , key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set"
        /* SET */
        , key, value, oldValue);
      }
    }

    return result;
  };
}

function deleteProperty(target, key) {
  const hadKey = hasOwn(target, key);
  const oldValue = target[key];
  const result = Reflect.deleteProperty(target, key);

  if (result && hadKey) {
    trigger(target, "delete"
    /* DELETE */
    , key, undefined, oldValue);
  }

  return result;
}

function has(target, key) {
  const result = Reflect.has(target, key);

  if (!isSymbol(key) || !builtInSymbols.has(key)) {
    track(target, "has"
    /* HAS */
    , key);
  }

  return result;
}

function ownKeys(target) {
  track(target, "iterate"
  /* ITERATE */
  , isArray(target) ? 'length' : ITERATE_KEY);
  return Reflect.ownKeys(target);
}

const mutableHandlers = {
  get,
  set,
  deleteProperty,
  has,
  ownKeys
};
const readonlyHandlers = {
  get: readonlyGet,

  set(target, key) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
    }

    return true;
  },

  deleteProperty(target, key) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
    }

    return true;
  }

};
// refs (in order to allow refs to be explicitly passed down), but should
// retain the reactivity of the normal readonly object.

const shallowReadonlyHandlers = /*#__PURE__*/extend({}, readonlyHandlers, {
  get: shallowReadonlyGet
});

const toShallow = value => value;

const getProto = v => Reflect.getPrototypeOf(v);

function get$1(target, key, isReadonly = false, isShallow = false) {
  // #1772: readonly(reactive(Map)) should return readonly + reactive version
  // of the value
  target = target["__v_raw"
  /* RAW */
  ];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);

  if (key !== rawKey) {
    !isReadonly && track(rawTarget, "get"
    /* GET */
    , key);
  }

  !isReadonly && track(rawTarget, "get"
  /* GET */
  , rawKey);
  const {
    has
  } = getProto(rawTarget);
  const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;

  if (has.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    // #3602 readonly(reactive(Map))
    // ensure that the nested reactive `Map` can do tracking for itself
    target.get(key);
  }
}

function has$1(key, isReadonly = false) {
  const target = this["__v_raw"
  /* RAW */
  ];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);

  if (key !== rawKey) {
    !isReadonly && track(rawTarget, "has"
    /* HAS */
    , key);
  }

  !isReadonly && track(rawTarget, "has"
  /* HAS */
  , rawKey);
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}

function size(target, isReadonly = false) {
  target = target["__v_raw"
  /* RAW */
  ];
  !isReadonly && track(toRaw(target), "iterate"
  /* ITERATE */
  , ITERATE_KEY);
  return Reflect.get(target, 'size', target);
}

function add(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);

  if (!hadKey) {
    target.add(value);
    trigger(target, "add"
    /* ADD */
    , value, value);
  }

  return this;
}

function set$1(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const {
    has,
    get
  } = getProto(target);
  let hadKey = has.call(target, key);

  if (!hadKey) {
    key = toRaw(key);
    hadKey = has.call(target, key);
  } else if (process.env.NODE_ENV !== 'production') {
    checkIdentityKeys(target, has, key);
  }

  const oldValue = get.call(target, key);
  target.set(key, value);

  if (!hadKey) {
    trigger(target, "add"
    /* ADD */
    , key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set"
    /* SET */
    , key, value, oldValue);
  }

  return this;
}

function deleteEntry(key) {
  const target = toRaw(this);
  const {
    has,
    get
  } = getProto(target);
  let hadKey = has.call(target, key);

  if (!hadKey) {
    key = toRaw(key);
    hadKey = has.call(target, key);
  } else if (process.env.NODE_ENV !== 'production') {
    checkIdentityKeys(target, has, key);
  }

  const oldValue = get ? get.call(target, key) : undefined; // forward the operation before queueing reactions

  const result = target.delete(key);

  if (hadKey) {
    trigger(target, "delete"
    /* DELETE */
    , key, undefined, oldValue);
  }

  return result;
}

function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const oldTarget = process.env.NODE_ENV !== 'production' ? isMap(target) ? new Map(target) : new Set(target) : undefined; // forward the operation before queueing reactions

  const result = target.clear();

  if (hadItems) {
    trigger(target, "clear"
    /* CLEAR */
    , undefined, undefined, oldTarget);
  }

  return result;
}

function createForEach(isReadonly, isShallow) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed["__v_raw"
    /* RAW */
    ];
    const rawTarget = toRaw(target);
    const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
    !isReadonly && track(rawTarget, "iterate"
    /* ITERATE */
    , ITERATE_KEY);
    return target.forEach((value, key) => {
      // important: make sure the callback is
      // 1. invoked with the reactive map as `this` and 3rd arg
      // 2. the value received should be a corresponding reactive/readonly.
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}

function createIterableMethod(method, isReadonly, isShallow) {
  return function (...args) {
    const target = this["__v_raw"
    /* RAW */
    ];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === 'entries' || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === 'keys' && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
    !isReadonly && track(rawTarget, "iterate"
    /* ITERATE */
    , isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY); // return a wrapped iterator which returns observed versions of the
    // values emitted from the real iterator

    return {
      // iterator protocol
      next() {
        const {
          value,
          done
        } = innerIterator.next();
        return done ? {
          value,
          done
        } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },

      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }

    };
  };
}

function createReadonlyMethod(type) {
  return function (...args) {
    if (process.env.NODE_ENV !== 'production') {
      const key = args[0] ? `on key "${args[0]}" ` : ``;
      console.warn(`${capitalize(type)} operation ${key}failed: target is readonly.`, toRaw(this));
    }

    return type === "delete"
    /* DELETE */
    ? false : this;
  };
}

function createInstrumentations() {
  const mutableInstrumentations = {
    get(key) {
      return get$1(this, key);
    },

    get size() {
      return size(this);
    },

    has: has$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations = {
    get(key) {
      return get$1(this, key, false, true);
    },

    get size() {
      return size(this);
    },

    has: has$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations = {
    get(key) {
      return get$1(this, key, true);
    },

    get size() {
      return size(this, true);
    },

    has(key) {
      return has$1.call(this, key, true);
    },

    add: createReadonlyMethod("add"
    /* ADD */
    ),
    set: createReadonlyMethod("set"
    /* SET */
    ),
    delete: createReadonlyMethod("delete"
    /* DELETE */
    ),
    clear: createReadonlyMethod("clear"
    /* CLEAR */
    ),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations = {
    get(key) {
      return get$1(this, key, true, true);
    },

    get size() {
      return size(this, true);
    },

    has(key) {
      return has$1.call(this, key, true);
    },

    add: createReadonlyMethod("add"
    /* ADD */
    ),
    set: createReadonlyMethod("set"
    /* SET */
    ),
    delete: createReadonlyMethod("delete"
    /* DELETE */
    ),
    clear: createReadonlyMethod("clear"
    /* CLEAR */
    ),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = ['keys', 'values', 'entries', Symbol.iterator];
  iteratorMethods.forEach(method => {
    mutableInstrumentations[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations[method] = createIterableMethod(method, true, false);
    shallowInstrumentations[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations[method] = createIterableMethod(method, true, true);
  });
  return [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations];
}

const [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* #__PURE__*/createInstrumentations();

function createInstrumentationGetter(isReadonly, shallow) {
  const instrumentations = shallow ? isReadonly ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive"
    /* IS_REACTIVE */
    ) {
      return !isReadonly;
    } else if (key === "__v_isReadonly"
    /* IS_READONLY */
    ) {
      return isReadonly;
    } else if (key === "__v_raw"
    /* RAW */
    ) {
      return target;
    }

    return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
  };
}

const mutableCollectionHandlers = {
  get: /*#__PURE__*/createInstrumentationGetter(false, false)
};
const readonlyCollectionHandlers = {
  get: /*#__PURE__*/createInstrumentationGetter(true, false)
};
const shallowReadonlyCollectionHandlers = {
  get: /*#__PURE__*/createInstrumentationGetter(true, true)
};

function checkIdentityKeys(target, has, key) {
  const rawKey = toRaw(key);

  if (rawKey !== key && has.call(target, rawKey)) {
    const type = toRawType(target);
    console.warn(`Reactive ${type} contains both the raw and reactive ` + `versions of the same object${type === `Map` ? ` as keys` : ``}, ` + `which can lead to inconsistencies. ` + `Avoid differentiating between the raw and reactive versions ` + `of an object and only use the reactive version if possible.`);
  }
}

const reactiveMap = new WeakMap();
const shallowReactiveMap = new WeakMap();
const readonlyMap = new WeakMap();
const shallowReadonlyMap = new WeakMap();

function targetTypeMap(rawType) {
  switch (rawType) {
    case 'Object':
    case 'Array':
      return 1
      /* COMMON */
      ;

    case 'Map':
    case 'Set':
    case 'WeakMap':
    case 'WeakSet':
      return 2
      /* COLLECTION */
      ;

    default:
      return 0
      /* INVALID */
      ;
  }
}

function getTargetType(value) {
  return value["__v_skip"
  /* SKIP */
  ] || !Object.isExtensible(value) ? 0
  /* INVALID */
  : targetTypeMap(toRawType(value));
}

function reactive(target) {
  // if trying to observe a readonly proxy, return the readonly version.
  if (isReadonly(target)) {
    return target;
  }

  return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}
/**
 * Creates a readonly copy of the original object. Note the returned copy is not
 * made reactive, but `readonly` can be called on an already reactive object.
 */


function readonly(target) {
  return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}
/**
 * Returns a reactive-copy of the original object, where only the root level
 * properties are readonly, and does NOT unwrap refs nor recursively convert
 * returned properties.
 * This is used for creating the props proxy object for stateful components.
 */


function shallowReadonly(target) {
  return createReactiveObject(target, true, shallowReadonlyHandlers, shallowReadonlyCollectionHandlers, shallowReadonlyMap);
}

function createReactiveObject(target, isReadonly, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject(target)) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`value cannot be made reactive: ${String(target)}`);
    }

    return target;
  } // target is already a Proxy, return it.
  // exception: calling readonly() on a reactive object


  if (target["__v_raw"
  /* RAW */
  ] && !(isReadonly && target["__v_isReactive"
  /* IS_REACTIVE */
  ])) {
    return target;
  } // target already has corresponding Proxy


  const existingProxy = proxyMap.get(target);

  if (existingProxy) {
    return existingProxy;
  } // only a whitelist of value types can be observed.


  const targetType = getTargetType(target);

  if (targetType === 0
  /* INVALID */
  ) {
    return target;
  }

  const proxy = new Proxy(target, targetType === 2
  /* COLLECTION */
  ? collectionHandlers : baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
}

function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"
    /* RAW */
    ]);
  }

  return !!(value && value["__v_isReactive"
  /* IS_REACTIVE */
  ]);
}

function isReadonly(value) {
  return !!(value && value["__v_isReadonly"
  /* IS_READONLY */
  ]);
}

function isShallow$1(value) {
  return !!(value && value["__v_isShallow"
  /* IS_SHALLOW */
  ]);
}

function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}

function toRaw(observed) {
  const raw = observed && observed["__v_raw"
  /* RAW */
  ];
  return raw ? toRaw(raw) : observed;
}

function markRaw(value) {
  def(value, "__v_skip"
  /* SKIP */
  , true);
  return value;
}

const toReactive = value => isObject(value) ? reactive(value) : value;

const toReadonly = value => isObject(value) ? readonly(value) : value;

function trackRefValue(ref) {
  if (shouldTrack && activeEffect) {
    ref = toRaw(ref);

    if (process.env.NODE_ENV !== 'production') {
      trackEffects(ref.dep || (ref.dep = createDep()), {
        target: ref,
        type: "get"
        /* GET */
        ,
        key: 'value'
      });
    } else {
      trackEffects(ref.dep || (ref.dep = createDep()));
    }
  }
}

function triggerRefValue(ref, newVal) {
  ref = toRaw(ref);

  if (ref.dep) {
    if (process.env.NODE_ENV !== 'production') {
      triggerEffects(ref.dep, {
        target: ref,
        type: "set"
        /* SET */
        ,
        key: 'value',
        newValue: newVal
      });
    } else {
      triggerEffects(ref.dep);
    }
  }
}

function isRef(r) {
  return !!(r && r.__v_isRef === true);
}

function ref(value) {
  return createRef(value, false);
}

function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }

  return new RefImpl(rawValue, shallow);
}

class RefImpl {
  constructor(value, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = undefined;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value : toRaw(value);
    this._value = __v_isShallow ? value : toReactive(value);
  }

  get value() {
    trackRefValue(this);
    return this._value;
  }

  set value(newVal) {
    newVal = this.__v_isShallow ? newVal : toRaw(newVal);

    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = this.__v_isShallow ? newVal : toReactive(newVal);
      triggerRefValue(this, newVal);
    }
  }

}

function unref(ref) {
  return isRef(ref) ? ref.value : ref;
}

const shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];

    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};

function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}

function toRefs(object) {
  if (process.env.NODE_ENV !== 'production' && !isProxy(object)) {
    console.warn(`toRefs() expects a reactive object but received a plain one.`);
  }

  const ret = isArray(object) ? new Array(object.length) : {};

  for (const key in object) {
    ret[key] = toRef(object, key);
  }

  return ret;
}

class ObjectRefImpl {
  constructor(_object, _key, _defaultValue) {
    this._object = _object;
    this._key = _key;
    this._defaultValue = _defaultValue;
    this.__v_isRef = true;
  }

  get value() {
    const val = this._object[this._key];
    return val === undefined ? this._defaultValue : val;
  }

  set value(newVal) {
    this._object[this._key] = newVal;
  }

}

function toRef(object, key, defaultValue) {
  const val = object[key];
  return isRef(val) ? val : new ObjectRefImpl(object, key, defaultValue);
}

Promise.resolve();

const stack = [];

function pushWarningContext(vnode) {
  stack.push(vnode);
}

function popWarningContext() {
  stack.pop();
}

function warn(msg, ...args) {
  // avoid props formatting or warn handler tracking deps that might be mutated
  // during patch, leading to infinite recursion.
  pauseTracking();
  const instance = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();

  if (appWarnHandler) {
    callWithErrorHandling(appWarnHandler, instance, 11
    /* APP_WARN_HANDLER */
    , [msg + args.join(''), instance && instance.proxy, trace.map(({
      vnode
    }) => `at <${formatComponentName(instance, vnode.type)}>`).join('\n'), trace]);
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    /* istanbul ignore if */

    if (trace.length && // avoid spamming console during tests
    !false) {
      warnArgs.push(`\n`, ...formatTrace(trace));
    }

    console.warn(...warnArgs);
  }

  resetTracking();
}

function getComponentTrace() {
  let currentVNode = stack[stack.length - 1];

  if (!currentVNode) {
    return [];
  } // we can't just use the stack because it will be incomplete during updates
  // that did not start from the root. Re-construct the parent chain using
  // instance parent pointers.


  const normalizedStack = [];

  while (currentVNode) {
    const last = normalizedStack[0];

    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }

    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }

  return normalizedStack;
}
/* istanbul ignore next */


function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i) => {
    logs.push(...(i === 0 ? [] : [`\n`]), ...formatTraceEntry(entry));
  });
  return logs;
}

function formatTraceEntry({
  vnode,
  recurseCount
}) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(vnode.component, vnode.type, isRoot)}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
}
/* istanbul ignore next */


function formatProps(props) {
  const res = [];
  const keys = Object.keys(props);
  keys.slice(0, 3).forEach(key => {
    res.push(...formatProp(key, props[key]));
  });

  if (keys.length > 3) {
    res.push(` ...`);
  }

  return res;
}
/* istanbul ignore next */


function formatProp(key, value, raw) {
  if (isString(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === 'number' || typeof value === 'boolean' || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (isRef(value)) {
    value = formatProp(key, toRaw(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = toRaw(value);
    return raw ? value : [`${key}=`, value];
  }
}

const ErrorTypeStrings = {
  ["sp"
  /* SERVER_PREFETCH */
  ]: 'serverPrefetch hook',
  ["bc"
  /* BEFORE_CREATE */
  ]: 'beforeCreate hook',
  ["c"
  /* CREATED */
  ]: 'created hook',
  ["bm"
  /* BEFORE_MOUNT */
  ]: 'beforeMount hook',
  ["m"
  /* MOUNTED */
  ]: 'mounted hook',
  ["bu"
  /* BEFORE_UPDATE */
  ]: 'beforeUpdate hook',
  ["u"
  /* UPDATED */
  ]: 'updated',
  ["bum"
  /* BEFORE_UNMOUNT */
  ]: 'beforeUnmount hook',
  ["um"
  /* UNMOUNTED */
  ]: 'unmounted hook',
  ["a"
  /* ACTIVATED */
  ]: 'activated hook',
  ["da"
  /* DEACTIVATED */
  ]: 'deactivated hook',
  ["ec"
  /* ERROR_CAPTURED */
  ]: 'errorCaptured hook',
  ["rtc"
  /* RENDER_TRACKED */
  ]: 'renderTracked hook',
  ["rtg"
  /* RENDER_TRIGGERED */
  ]: 'renderTriggered hook',
  [0
  /* SETUP_FUNCTION */
  ]: 'setup function',
  [1
  /* RENDER_FUNCTION */
  ]: 'render function',
  [2
  /* WATCH_GETTER */
  ]: 'watcher getter',
  [3
  /* WATCH_CALLBACK */
  ]: 'watcher callback',
  [4
  /* WATCH_CLEANUP */
  ]: 'watcher cleanup function',
  [5
  /* NATIVE_EVENT_HANDLER */
  ]: 'native event handler',
  [6
  /* COMPONENT_EVENT_HANDLER */
  ]: 'component event handler',
  [7
  /* VNODE_HOOK */
  ]: 'vnode hook',
  [8
  /* DIRECTIVE_HOOK */
  ]: 'directive hook',
  [9
  /* TRANSITION_HOOK */
  ]: 'transition hook',
  [10
  /* APP_ERROR_HANDLER */
  ]: 'app errorHandler',
  [11
  /* APP_WARN_HANDLER */
  ]: 'app warnHandler',
  [12
  /* FUNCTION_REF */
  ]: 'ref function',
  [13
  /* ASYNC_COMPONENT_LOADER */
  ]: 'async component loader',
  [14
  /* SCHEDULER */
  ]: 'scheduler flush. This is likely a Vue internals bug. ' + 'Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core'
};

function callWithErrorHandling(fn, instance, type, args) {
  let res;

  try {
    res = args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }

  return res;
}

function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);

    if (res && isPromise(res)) {
      res.catch(err => {
        handleError(err, instance, type);
      });
    }

    return res;
  }

  const values = [];

  for (let i = 0; i < fn.length; i++) {
    values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
  }

  return values;
}

function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;

  if (instance) {
    let cur = instance.parent; // the exposed instance is the render proxy to keep it consistent with 2.x

    const exposedInstance = instance.proxy; // in production the hook receives only the error code

    const errorInfo = process.env.NODE_ENV !== 'production' ? ErrorTypeStrings[type] : type;

    while (cur) {
      const errorCapturedHooks = cur.ec;

      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }

      cur = cur.parent;
    } // app-level handling


    const appErrorHandler = instance.appContext.config.errorHandler;

    if (appErrorHandler) {
      callWithErrorHandling(appErrorHandler, null, 10
      /* APP_ERROR_HANDLER */
      , [err, exposedInstance, errorInfo]);
      return;
    }
  }

  logError(err, type, contextVNode, throwInDev);
}

function logError(err, type, contextVNode, throwInDev = true) {
  if (process.env.NODE_ENV !== 'production') {
    const info = ErrorTypeStrings[type];

    if (contextVNode) {
      pushWarningContext(contextVNode);
    }

    warn(`Unhandled error${info ? ` during execution of ${info}` : ``}`);

    if (contextVNode) {
      popWarningContext();
    } // crash in dev by default so it's more noticeable


    if (throwInDev) {
      throw err;
    } else {
      console.error(err);
    }
  } else {
    // recover in prod to reduce the impact on end-user
    console.error(err);
  }
}

let isFlushing = false;
let isFlushPending = false;
const queue = [];
let flushIndex = 0;
const pendingPreFlushCbs = [];
let activePreFlushCbs = null;
let preFlushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = Promise.resolve();
let currentFlushPromise = null;
let currentPreFlushParentJob = null;
const RECURSION_LIMIT = 100;

function nextTick(fn) {
  const p = currentFlushPromise || resolvedPromise;
  return fn ? p.then(this ? fn.bind(this) : fn) : p;
} // #2768
// Use binary-search to find a suitable position in the queue,
// so that the queue maintains the increasing order of job's id,
// which can prevent the job from being skipped and also can avoid repeated patching.


function findInsertionIndex(id) {
  // the start index should be `flushIndex + 1`
  let start = flushIndex + 1;
  let end = queue.length;

  while (start < end) {
    const middle = start + end >>> 1;
    const middleJobId = getId(queue[middle]);
    middleJobId < id ? start = middle + 1 : end = middle;
  }

  return start;
}

function queueJob(job) {
  // the dedupe search uses the startIndex argument of Array.includes()
  // by default the search index includes the current job that is being run
  // so it cannot recursively trigger itself again.
  // if the job is a watch() callback, the search will start with a +1 index to
  // allow it recursively trigger itself - it is the user's responsibility to
  // ensure it doesn't end up in an infinite loop.
  if ((!queue.length || !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) && job !== currentPreFlushParentJob) {
    if (job.id == null) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(job.id), 0, job);
    }

    queueFlush();
  }
}

function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}

function queueCb(cb, activeQueue, pendingQueue, index) {
  if (!isArray(cb)) {
    if (!activeQueue || !activeQueue.includes(cb, cb.allowRecurse ? index + 1 : index)) {
      pendingQueue.push(cb);
    }
  } else {
    // if cb is an array, it is a component lifecycle hook which can only be
    // triggered by a job, which is already deduped in the main queue, so
    // we can skip duplicate check here to improve perf
    pendingQueue.push(...cb);
  }

  queueFlush();
}

function queuePreFlushCb(cb) {
  queueCb(cb, activePreFlushCbs, pendingPreFlushCbs, preFlushIndex);
}

function queuePostFlushCb(cb) {
  queueCb(cb, activePostFlushCbs, pendingPostFlushCbs, postFlushIndex);
}

function flushPreFlushCbs(seen, parentJob = null) {
  if (pendingPreFlushCbs.length) {
    currentPreFlushParentJob = parentJob;
    activePreFlushCbs = [...new Set(pendingPreFlushCbs)];
    pendingPreFlushCbs.length = 0;

    if (process.env.NODE_ENV !== 'production') {
      seen = seen || new Map();
    }

    for (preFlushIndex = 0; preFlushIndex < activePreFlushCbs.length; preFlushIndex++) {
      if (process.env.NODE_ENV !== 'production' && checkRecursiveUpdates(seen, activePreFlushCbs[preFlushIndex])) {
        continue;
      }

      activePreFlushCbs[preFlushIndex]();
    }

    activePreFlushCbs = null;
    preFlushIndex = 0;
    currentPreFlushParentJob = null; // recursively flush until it drains

    flushPreFlushCbs(seen, parentJob);
  }
}

function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)];
    pendingPostFlushCbs.length = 0; // #1947 already has active queue, nested flushPostFlushCbs call

    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }

    activePostFlushCbs = deduped;

    if (process.env.NODE_ENV !== 'production') {
      seen = seen || new Map();
    }

    activePostFlushCbs.sort((a, b) => getId(a) - getId(b));

    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      if (process.env.NODE_ENV !== 'production' && checkRecursiveUpdates(seen, activePostFlushCbs[postFlushIndex])) {
        continue;
      }

      activePostFlushCbs[postFlushIndex]();
    }

    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}

const getId = job => job.id == null ? Infinity : job.id;

function flushJobs(seen) {
  isFlushPending = false;
  isFlushing = true;

  if (process.env.NODE_ENV !== 'production') {
    seen = seen || new Map();
  }

  flushPreFlushCbs(seen); // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child so its render effect will have smaller
  //    priority number)
  // 2. If a component is unmounted during a parent component's update,
  //    its update can be skipped.

  queue.sort((a, b) => getId(a) - getId(b)); // conditional usage of checkRecursiveUpdate must be determined out of
  // try ... catch block since Rollup by default de-optimizes treeshaking
  // inside try-catch. This can leave all warning code unshaked. Although
  // they would get eventually shaken by a minifier like terser, some minifiers
  // would fail to do that (e.g. https://github.com/evanw/esbuild/issues/1610)

  const check = process.env.NODE_ENV !== 'production' ? job => checkRecursiveUpdates(seen, job) : NOOP;

  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];

      if (job && job.active !== false) {
        if (process.env.NODE_ENV !== 'production' && check(job)) {
          continue;
        } // console.log(`running:`, job.id)


        callWithErrorHandling(job, null, 14
        /* SCHEDULER */
        );
      }
    }
  } finally {
    flushIndex = 0;
    queue.length = 0;
    flushPostFlushCbs(seen);
    isFlushing = false;
    currentFlushPromise = null; // some postFlushCb queued jobs!
    // keep flushing until it drains.

    if (queue.length || pendingPreFlushCbs.length || pendingPostFlushCbs.length) {
      flushJobs(seen);
    }
  }
}

function checkRecursiveUpdates(seen, fn) {
  if (!seen.has(fn)) {
    seen.set(fn, 1);
  } else {
    const count = seen.get(fn);

    if (count > RECURSION_LIMIT) {
      const instance = fn.ownerInstance;
      const componentName = instance && getComponentName(instance.type);
      warn(`Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. ` + `This means you have a reactive effect that is mutating its own ` + `dependencies and thus recursively triggering itself. Possible sources ` + `include component template, render function, updated hook or ` + `watcher source function.`);
      return true;
    } else {
      seen.set(fn, count + 1);
    }
  }
}
const hmrDirtyComponents = new Set(); // Expose the HMR runtime on the global object
// This makes it entirely tree-shakable without polluting the exports and makes
// it easier to be used in toolings like vue-loader
// Note: for a component to be eligible for HMR it also needs the __hmrId option
// to be set so that its instances can be registered / removed.

if (process.env.NODE_ENV !== 'production') {
  getGlobalThis().__VUE_HMR_RUNTIME__ = {
    createRecord: tryWrap(createRecord),
    rerender: tryWrap(rerender),
    reload: tryWrap(reload)
  };
}

const map = new Map();

function createRecord(id, initialDef) {
  if (map.has(id)) {
    return false;
  }

  map.set(id, {
    initialDef: normalizeClassComponent(initialDef),
    instances: new Set()
  });
  return true;
}

function normalizeClassComponent(component) {
  return isClassComponent(component) ? component.__vccOpts : component;
}

function rerender(id, newRender) {
  const record = map.get(id);

  if (!record) {
    return;
  } // update initial record (for not-yet-rendered component)


  record.initialDef.render = newRender;
  [...record.instances].forEach(instance => {
    if (newRender) {
      instance.render = newRender;
      normalizeClassComponent(instance.type).render = newRender;
    }

    instance.renderCache = []; // this flag forces child components with slot content to update
    instance.update();
  });
}

function reload(id, newComp) {
  const record = map.get(id);
  if (!record) return;
  newComp = normalizeClassComponent(newComp); // update initial def (for not-yet-rendered components)

  updateComponentDef(record.initialDef, newComp); // create a snapshot which avoids the set being mutated during updates

  const instances = [...record.instances];

  for (const instance of instances) {
    const oldComp = normalizeClassComponent(instance.type);

    if (!hmrDirtyComponents.has(oldComp)) {
      // 1. Update existing comp definition to match new one
      if (oldComp !== record.initialDef) {
        updateComponentDef(oldComp, newComp);
      } // 2. mark definition dirty. This forces the renderer to replace the
      // component on patch.


      hmrDirtyComponents.add(oldComp);
    } // 3. invalidate options resolution cache


    instance.appContext.optionsCache.delete(instance.type); // 4. actually update

    if (instance.ceReload) {
      // custom element
      hmrDirtyComponents.add(oldComp);
      instance.ceReload(newComp.styles);
      hmrDirtyComponents.delete(oldComp);
    } else if (instance.parent) {
      // 4. Force the parent instance to re-render. This will cause all updated
      // components to be unmounted and re-mounted. Queue the update so that we
      // don't end up forcing the same parent to re-render multiple times.
      queueJob(instance.parent.update); // instance is the inner component of an async custom element
      // invoke to reset styles

      if (instance.parent.type.__asyncLoader && instance.parent.ceReload) {
        instance.parent.ceReload(newComp.styles);
      }
    } else if (instance.appContext.reload) {
      // root instance mounted via createApp() has a reload method
      instance.appContext.reload();
    } else if (typeof window !== 'undefined') {
      // root instance inside tree created via raw render(). Force reload.
      window.location.reload();
    } else {
      console.warn('[HMR] Root or manually mounted instance modified. Full reload required.');
    }
  } // 5. make sure to cleanup dirty hmr components after update


  queuePostFlushCb(() => {
    for (const instance of instances) {
      hmrDirtyComponents.delete(normalizeClassComponent(instance.type));
    }
  });
}

function updateComponentDef(oldComp, newComp) {
  extend(oldComp, newComp);

  for (const key in oldComp) {
    if (key !== '__file' && !(key in newComp)) {
      delete oldComp[key];
    }
  }
}

function tryWrap(fn) {
  return (id, arg) => {
    try {
      return fn(id, arg);
    } catch (e) {
      console.error(e);
      console.warn(`[HMR] Something went wrong during Vue component hot-reload. ` + `Full reload required.`);
    }
  };
}
/**
 * mark the current rendering instance for asset resolution (e.g.
 * resolveComponent, resolveDirective) during render
 */


let currentRenderingInstance = null;
let currentScopeId = null;

function markAttrsAccessed() {
}

const isSuspense = type => type.__isSuspense; // Suspense exposes a component-like API, and is treated like a component

function queueEffectWithSuspense(fn, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (isArray(fn)) {
      suspense.effects.push(...fn);
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn);
  }
}


const INITIAL_WATCHER_VALUE = {}; // implementation

function doWatch(source, cb, {
  immediate,
  deep,
  flush,
  onTrack,
  onTrigger
} = EMPTY_OBJ) {
  if (process.env.NODE_ENV !== 'production' && !cb) {
    if (immediate !== undefined) {
      warn(`watch() "immediate" option is only respected when using the ` + `watch(source, callback, options?) signature.`);
    }

    if (deep !== undefined) {
      warn(`watch() "deep" option is only respected when using the ` + `watch(source, callback, options?) signature.`);
    }
  }

  const warnInvalidSource = s => {
    warn(`Invalid watch source: `, s, `A watch source can only be a getter/effect function, a ref, ` + `a reactive object, or an array of these types.`);
  };

  const instance = currentInstance;
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;

  if (isRef(source)) {
    getter = () => source.value;

    forceTrigger = isShallow$1(source);
  } else if (isReactive(source)) {
    getter = () => source;

    deep = true;
  } else if (isArray(source)) {
    isMultiSource = true;
    forceTrigger = source.some(isReactive);

    getter = () => source.map(s => {
      if (isRef(s)) {
        return s.value;
      } else if (isReactive(s)) {
        return traverse(s);
      } else if (isFunction(s)) {
        return callWithErrorHandling(s, instance, 2
        /* WATCH_GETTER */
        );
      } else {
        process.env.NODE_ENV !== 'production' && warnInvalidSource(s);
      }
    });
  } else if (isFunction(source)) {
    if (cb) {
      // getter with cb
      getter = () => callWithErrorHandling(source, instance, 2
      /* WATCH_GETTER */
      );
    } else {
      // no cb -> simple effect
      getter = () => {
        if (instance && instance.isUnmounted) {
          return;
        }

        if (cleanup) {
          cleanup();
        }

        return callWithAsyncErrorHandling(source, instance, 3
        /* WATCH_CALLBACK */
        , [onCleanup]);
      };
    }
  } else {
    getter = NOOP;
    process.env.NODE_ENV !== 'production' && warnInvalidSource(source);
  }

  if (cb && deep) {
    const baseGetter = getter;

    getter = () => traverse(baseGetter());
  }

  let cleanup;

  let onCleanup = fn => {
    cleanup = effect.onStop = () => {
      callWithErrorHandling(fn, instance, 4
      /* WATCH_CLEANUP */
      );
    };
  }; // in SSR there is no need to setup an actual effect, and it should be noop

  let oldValue = isMultiSource ? [] : INITIAL_WATCHER_VALUE;

  const job = () => {
    if (!effect.active) {
      return;
    }

    if (cb) {
      // watch(source, cb)
      const newValue = effect.run();

      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue)) || false) {
        // cleanup before running cb again
        if (cleanup) {
          cleanup();
        }

        callWithAsyncErrorHandling(cb, instance, 3
        /* WATCH_CALLBACK */
        , [newValue, // pass undefined as the old value when it's changed for the first time
        oldValue === INITIAL_WATCHER_VALUE ? undefined : oldValue, onCleanup]);
        oldValue = newValue;
      }
    } else {
      // watchEffect
      effect.run();
    }
  }; // important: mark the job as a watcher callback so that scheduler knows
  // it is allowed to self-trigger (#1727)


  job.allowRecurse = !!cb;
  let scheduler;

  if (flush === 'sync') {
    scheduler = job; // the scheduler function gets called directly
  } else if (flush === 'post') {
    scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
  } else {
    // default: 'pre'
    scheduler = () => {
      if (!instance || instance.isMounted) {
        queuePreFlushCb(job);
      } else {
        // with 'pre' option, the first call must happen before
        // the component is mounted so it is called synchronously.
        job();
      }
    };
  }

  const effect = new ReactiveEffect(getter, scheduler);

  if (process.env.NODE_ENV !== 'production') {
    effect.onTrack = onTrack;
    effect.onTrigger = onTrigger;
  } // initial run


  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect.run();
    }
  } else if (flush === 'post') {
    queuePostRenderEffect(effect.run.bind(effect), instance && instance.suspense);
  } else {
    effect.run();
  }

  return () => {
    effect.stop();

    if (instance && instance.scope) {
      remove(instance.scope.effects, effect);
    }
  };
} // this.$watch


function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString(source) ? source.includes('.') ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;

  if (isFunction(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }

  const cur = currentInstance;
  setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);

  if (cur) {
    setCurrentInstance(cur);
  } else {
    unsetCurrentInstance();
  }

  return res;
}

function createPathGetter(ctx, path) {
  const segments = path.split('.');
  return () => {
    let cur = ctx;

    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }

    return cur;
  };
}

function traverse(value, seen) {
  if (!isObject(value) || value["__v_skip"
  /* SKIP */
  ]) {
    return value;
  }

  seen = seen || new Set();

  if (seen.has(value)) {
    return value;
  }

  seen.add(value);

  if (isRef(value)) {
    traverse(value.value, seen);
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach(v => {
      traverse(v, seen);
    });
  } else if (isPlainObject(value)) {
    for (const key in value) {
      traverse(value[key], seen);
    }
  }

  return value;
}


function defineComponent(options) {
  return isFunction(options) ? {
    setup: options,
    name: options.name
  } : options;
}

function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    const hooks = target[type] || (target[type] = []); // cache the error handling wrapper for injected hooks so the same hook
    // can be properly deduped by the scheduler. "__weh" stands for "with error
    // handling".

    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      } // disable tracking inside all lifecycle hooks
      // since they can potentially be called inside effects.


      pauseTracking(); // Set currentInstance during hook invocation.
      // This assumes the hook does not synchronously trigger other hooks, which
      // can only be false when the user does something really funky.

      setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      unsetCurrentInstance();
      resetTracking();
      return res;
    });

    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }

    return wrappedHook;
  } else if (process.env.NODE_ENV !== 'production') {
    const apiName = toHandlerKey(ErrorTypeStrings[type].replace(/ hook$/, ''));
    warn(`${apiName} is called when there is no active component instance to be ` + `associated with. ` + `Lifecycle injection APIs can only be used during execution of setup().` + (` If you are using async setup(), make sure to register lifecycle ` + `hooks before the first await statement.`));
  }
}

const createHook = lifecycle => (hook, target = currentInstance) => // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
injectHook(lifecycle, hook, target);
const onMounted = createHook("m"
/* MOUNTED */
);

let shouldCacheAccess = true;
/**
 * Resolve merged options and cache it on the component.
 * This is done only once per-component since the merging does not involve
 * instances.
 */


function resolveMergedOptions(instance) {
  const base = instance.type;
  const {
    mixins,
    extends: extendsOptions
  } = base;
  const {
    mixins: globalMixins,
    optionsCache: cache,
    config: {
      optionMergeStrategies
    }
  } = instance.appContext;
  const cached = cache.get(base);
  let resolved;

  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};

    if (globalMixins.length) {
      globalMixins.forEach(m => mergeOptions(resolved, m, optionMergeStrategies, true));
    }

    mergeOptions(resolved, base, optionMergeStrategies);
  }

  cache.set(base, resolved);
  return resolved;
}

function mergeOptions(to, from, strats, asMixin = false) {
  const {
    mixins,
    extends: extendsOptions
  } = from;

  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true);
  }

  if (mixins) {
    mixins.forEach(m => mergeOptions(to, m, strats, true));
  }

  for (const key in from) {
    if (asMixin && key === 'expose') {
      process.env.NODE_ENV !== 'production' && warn(`"expose" option is ignored when declared in mixins or extends. ` + `It should only be declared in the base component itself.`);
    } else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }

  return to;
}

const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeObjectOptions,
  emits: mergeObjectOptions,
  // objects
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  // lifecycle
  beforeCreate: mergeAsArray,
  created: mergeAsArray,
  beforeMount: mergeAsArray,
  mounted: mergeAsArray,
  beforeUpdate: mergeAsArray,
  updated: mergeAsArray,
  beforeDestroy: mergeAsArray,
  beforeUnmount: mergeAsArray,
  destroyed: mergeAsArray,
  unmounted: mergeAsArray,
  activated: mergeAsArray,
  deactivated: mergeAsArray,
  errorCaptured: mergeAsArray,
  serverPrefetch: mergeAsArray,
  // assets
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  // watch
  watch: mergeWatchOptions,
  // provide / inject
  provide: mergeDataFn,
  inject: mergeInject
};

function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }

  if (!to) {
    return from;
  }

  return function mergedDataFn() {
    return extend(isFunction(to) ? to.call(this, this) : to, isFunction(from) ? from.call(this, this) : from);
  };
}

function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}

function normalizeInject(raw) {
  if (isArray(raw)) {
    const res = {};

    for (let i = 0; i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }

    return res;
  }

  return raw;
}

function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}

function mergeObjectOptions(to, from) {
  return to ? extend(extend(Object.create(null), to), from) : from;
}

function mergeWatchOptions(to, from) {
  if (!to) return from;
  if (!from) return to;
  const merged = extend(Object.create(null), to);

  for (const key in from) {
    merged[key] = mergeAsArray(to[key], from[key]);
  }

  return merged;
}

const queuePostRenderEffect = queueEffectWithSuspense;

const isTeleport = type => type.__isTeleport;

const NULL_DYNAMIC_COMPONENT = Symbol();

const Fragment = Symbol(process.env.NODE_ENV !== 'production' ? 'Fragment' : undefined);
const Text = Symbol(process.env.NODE_ENV !== 'production' ? 'Text' : undefined);
const Comment = Symbol(process.env.NODE_ENV !== 'production' ? 'Comment' : undefined);
Symbol(process.env.NODE_ENV !== 'production' ? 'Static' : undefined); // Since v-if and v-for are the two possible ways node structure can dynamically
// change, once we consider v-if branches and each v-for fragment a block, we
// can divide a template into nested blocks, and within each block the node
// structure would be stable. This allows us to skip most children diffing
// and only worry about the dynamic nodes (indicated by patch flags).

const blockStack = [];
let currentBlock = null;
/**
 * Open a block.
 * This must be called before `createBlock`. It cannot be part of `createBlock`
 * because the children of the block are evaluated before `createBlock` itself
 * is called. The generated code typically looks like this:
 *
 * ```js
 * function render() {
 *   return (openBlock(),createBlock('div', null, [...]))
 * }
 * ```
 * disableTracking is true when creating a v-for fragment block, since a v-for
 * fragment always diffs its children.
 *
 * @private
 */

function openBlock(disableTracking = false) {
  blockStack.push(currentBlock = disableTracking ? null : []);
}

function closeBlock() {
  blockStack.pop();
  currentBlock = blockStack[blockStack.length - 1] || null;
} // Whether we should be tracking dynamic child nodes inside a block.

function setupBlock(vnode) {
  // save current block children on the block vnode
  vnode.dynamicChildren = currentBlock || EMPTY_ARR ; // close block

  closeBlock(); // a block is always going to be patched, so track it as a child of its
  // parent block

  if (currentBlock) {
    currentBlock.push(vnode);
  }

  return vnode;
}
/**
 * Create a block root vnode. Takes the same exact arguments as `createVNode`.
 * A block root keeps track of dynamic nodes within the block in the
 * `dynamicChildren` array.
 *
 * @private
 */


function createBlock(type, props, children, patchFlag, dynamicProps) {
  return setupBlock(createVNode(type, props, children, patchFlag, dynamicProps, true
  /* isBlock: prevent a block from tracking itself */
  ));
}

function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}

const createVNodeWithArgsTransform = (...args) => {
  return _createVNode(...(args));
};

const InternalObjectKey = `__vInternal`;

const normalizeKey = ({
  key
}) => key != null ? key : null;

const normalizeRef = ({
  ref,
  ref_key,
  ref_for
}) => {
  return ref != null ? isString(ref) || isRef(ref) || isFunction(ref) ? {
    i: currentRenderingInstance,
    r: ref,
    k: ref_key,
    f: !!ref_for
  } : ref : null;
};

function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1
/* ELEMENT */
, isBlockNode = false, needFullChildrenNormalization = false) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null
  };

  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children); // normalize suspense children

    if (shapeFlag & 128
    /* SUSPENSE */
    ) {
      type.normalize(vnode);
    }
  } else if (children) {
    // compiled element vnode - if children is passed, only possible types are
    // string or Array.
    vnode.shapeFlag |= isString(children) ? 8
    /* TEXT_CHILDREN */
    : 16
    /* ARRAY_CHILDREN */
    ;
  } // validate key


  if (process.env.NODE_ENV !== 'production' && vnode.key !== vnode.key) {
    warn(`VNode created with invalid key (NaN). VNode type:`, vnode.type);
  } // track vnode for block tree


  if (// avoid a block node from tracking itself
  !isBlockNode && // has current parent block
  currentBlock && ( // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  vnode.patchFlag > 0 || shapeFlag & 6
  /* COMPONENT */
  ) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  vnode.patchFlag !== 32
  /* HYDRATE_EVENTS */
  ) {
    currentBlock.push(vnode);
  }

  return vnode;
}

const createVNode = process.env.NODE_ENV !== 'production' ? createVNodeWithArgsTransform : _createVNode;

function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
  if (!type || type === NULL_DYNAMIC_COMPONENT) {
    if (process.env.NODE_ENV !== 'production' && !type) {
      warn(`Invalid vnode type when creating vnode: ${type}.`);
    }

    type = Comment;
  }

  if (isVNode(type)) {
    // createVNode receiving an existing vnode. This happens in cases like
    // <component :is="vnode"/>
    // #2078 make sure to merge refs during the clone instead of overwriting it
    const cloned = cloneVNode(type, props, true
    /* mergeRef: true */
    );

    if (children) {
      normalizeChildren(cloned, children);
    }

    return cloned;
  } // class component normalization.


  if (isClassComponent(type)) {
    type = type.__vccOpts;
  } // class & style normalization.


  if (props) {
    // for reactive or proxy objects, we need to clone it to enable mutation.
    props = guardReactiveProps(props);
    let {
      class: klass,
      style
    } = props;

    if (klass && !isString(klass)) {
      props.class = normalizeClass(klass);
    }

    if (isObject(style)) {
      // reactive state objects need to be cloned since they are likely to be
      // mutated
      if (isProxy(style) && !isArray(style)) {
        style = extend({}, style);
      }

      props.style = normalizeStyle(style);
    }
  } // encode the vnode type information into a bitmap


  const shapeFlag = isString(type) ? 1
  /* ELEMENT */
  : isSuspense(type) ? 128
  /* SUSPENSE */
  : isTeleport(type) ? 64
  /* TELEPORT */
  : isObject(type) ? 4
  /* STATEFUL_COMPONENT */
  : isFunction(type) ? 2
  /* FUNCTIONAL_COMPONENT */
  : 0;

  if (process.env.NODE_ENV !== 'production' && shapeFlag & 4
  /* STATEFUL_COMPONENT */
  && isProxy(type)) {
    type = toRaw(type);
    warn(`Vue received a Component which was made a reactive object. This can ` + `lead to unnecessary performance overhead, and should be avoided by ` + `marking the component with \`markRaw\` or using \`shallowRef\` ` + `instead of \`ref\`.`, `\nComponent that was made reactive: `, type);
  }

  return createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, isBlockNode, true);
}

function guardReactiveProps(props) {
  if (!props) return null;
  return isProxy(props) || InternalObjectKey in props ? extend({}, props) : props;
}

function cloneVNode(vnode, extraProps, mergeRef = false) {
  // This is intentionally NOT using spread or extend to avoid the runtime
  // key enumeration cost.
  const {
    props,
    ref,
    patchFlag,
    children
  } = vnode;
  const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
  const cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey(mergedProps),
    ref: extraProps && extraProps.ref ? // #2078 in the case of <component :is="vnode" ref="extra"/>
    // if the vnode itself already has a ref, cloneVNode will need to merge
    // the refs so the single vnode can be set on multiple refs
    mergeRef && ref ? isArray(ref) ? ref.concat(normalizeRef(extraProps)) : [ref, normalizeRef(extraProps)] : normalizeRef(extraProps) : ref,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children: process.env.NODE_ENV !== 'production' && patchFlag === -1
    /* HOISTED */
    && isArray(children) ? children.map(deepCloneVNode) : children,
    target: vnode.target,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 // hoisted node
    ? 16
    /* FULL_PROPS */
    : patchFlag | 16
    /* FULL_PROPS */
    : patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition: vnode.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: vnode.component,
    suspense: vnode.suspense,
    ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
    ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
    el: vnode.el,
    anchor: vnode.anchor
  };
  return cloned;
}
/**
 * Dev only, for HMR of hoisted vnodes reused in v-for
 * https://github.com/vitejs/vite/issues/2022
 */


function deepCloneVNode(vnode) {
  const cloned = cloneVNode(vnode);

  if (isArray(vnode.children)) {
    cloned.children = vnode.children.map(deepCloneVNode);
  }

  return cloned;
}
/**
 * @private
 */


function createTextVNode(text = ' ', flag = 0) {
  return createVNode(Text, null, text, flag);
}

function normalizeChildren(vnode, children) {
  let type = 0;
  const {
    shapeFlag
  } = vnode;

  if (children == null) {
    children = null;
  } else if (isArray(children)) {
    type = 16
    /* ARRAY_CHILDREN */
    ;
  } else if (typeof children === 'object') {
    if (shapeFlag & (1
    /* ELEMENT */
    | 64
    /* TELEPORT */
    )) {
      // Normalize slot to plain children for plain element and Teleport
      const slot = children.default;

      if (slot) {
        // _c marker is added by withCtx() indicating this is a compiled slot
        slot._c && (slot._d = false);
        normalizeChildren(vnode, slot());
        slot._c && (slot._d = true);
      }

      return;
    } else {
      type = 32
      /* SLOTS_CHILDREN */
      ;
      const slotFlag = children._;

      if (!slotFlag && !(InternalObjectKey in children)) {
        children._ctx = currentRenderingInstance;
      } else if (slotFlag === 3
      /* FORWARDED */
      && currentRenderingInstance) {
        // a child component receives forwarded slots from the parent.
        // its slot type is determined by its parent's slot type.
        if (currentRenderingInstance.slots._ === 1
        /* STABLE */
        ) {
          children._ = 1
          /* STABLE */
          ;
        } else {
          children._ = 2
          /* DYNAMIC */
          ;
          vnode.patchFlag |= 1024
          /* DYNAMIC_SLOTS */
          ;
        }
      }
    }
  } else if (isFunction(children)) {
    children = {
      default: children,
      _ctx: currentRenderingInstance
    };
    type = 32
    /* SLOTS_CHILDREN */
    ;
  } else {
    children = String(children); // force teleport children to array so it can be moved around

    if (shapeFlag & 64
    /* TELEPORT */
    ) {
      type = 16
      /* ARRAY_CHILDREN */
      ;
      children = [createTextVNode(children)];
    } else {
      type = 8
      /* TEXT_CHILDREN */
      ;
    }
  }

  vnode.children = children;
  vnode.shapeFlag |= type;
}

function mergeProps(...args) {
  const ret = {};

  for (let i = 0; i < args.length; i++) {
    const toMerge = args[i];

    for (const key in toMerge) {
      if (key === 'class') {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass([ret.class, toMerge.class]);
        }
      } else if (key === 'style') {
        ret.style = normalizeStyle([ret.style, toMerge.style]);
      } else if (isOn(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];

        if (incoming && existing !== incoming && !(isArray(existing) && existing.includes(incoming))) {
          ret[key] = existing ? [].concat(existing, incoming) : incoming;
        }
      } else if (key !== '') {
        ret[key] = toMerge[key];
      }
    }
  }

  return ret;
}
/**
 * Compiler runtime helper for rendering `<slot/>`
 * @private
 */


function renderSlot(slots, name, props = {}, // this is not a user-facing function, so the fallback is always generated by
// the compiler and guaranteed to be a function returning an array
fallback, noSlotted) {
  if (currentRenderingInstance.isCE) {
    return createVNode('slot', name === 'default' ? null : {
      name
    }, fallback && fallback());
  }

  let slot = slots[name];

  if (process.env.NODE_ENV !== 'production' && slot && slot.length > 1) {
    warn(`SSR-optimized slot function detected in a non-SSR-optimized render ` + `function. You need to mark this component with $dynamic-slots in the ` + `parent template.`);

    slot = () => [];
  } // a compiled slot disables block tracking by default to avoid manual
  // invocation interfering with template-based block tracking, but in
  // `renderSlot` we can be sure that it's template-based so we can force
  // enable it.


  if (slot && slot._c) {
    slot._d = false;
  }

  openBlock();
  const validSlotContent = slot && ensureValidVNode(slot(props));
  const rendered = createBlock(Fragment, {
    key: props.key || `_${name}`
  }, validSlotContent || (fallback ? fallback() : []), validSlotContent && slots._ === 1
  /* STABLE */
  ? 64
  /* STABLE_FRAGMENT */
  : -2
  /* BAIL */
  );

  if (!noSlotted && rendered.scopeId) {
    rendered.slotScopeIds = [rendered.scopeId + '-s'];
  }

  if (slot && slot._c) {
    slot._d = true;
  }

  return rendered;
}

function ensureValidVNode(vnodes) {
  return vnodes.some(child => {
    if (!isVNode(child)) return true;
    if (child.type === Comment) return false;
    if (child.type === Fragment && !ensureValidVNode(child.children)) return false;
    return true;
  }) ? vnodes : null;
}
/**
 * #2437 In Vue 3, functional components do not have a public instance proxy but
 * they exist in the internal parent chain. For code that relies on traversing
 * public $parent chains, skip functional ones and go to the parent instead.
 */


const getPublicInstance = i => {
  if (!i) return null;
  if (isStatefulComponent(i)) return getExposeProxy(i) || i.proxy;
  return getPublicInstance(i.parent);
};

const publicPropertiesMap = extend(Object.create(null), {
  $: i => i,
  $el: i => i.vnode.el,
  $data: i => i.data,
  $props: i => process.env.NODE_ENV !== 'production' ? shallowReadonly(i.props) : i.props,
  $attrs: i => process.env.NODE_ENV !== 'production' ? shallowReadonly(i.attrs) : i.attrs,
  $slots: i => process.env.NODE_ENV !== 'production' ? shallowReadonly(i.slots) : i.slots,
  $refs: i => process.env.NODE_ENV !== 'production' ? shallowReadonly(i.refs) : i.refs,
  $parent: i => getPublicInstance(i.parent),
  $root: i => getPublicInstance(i.root),
  $emit: i => i.emit,
  $options: i => __VUE_OPTIONS_API__ ? resolveMergedOptions(i) : i.type,
  $forceUpdate: i => () => queueJob(i.update),
  $nextTick: i => nextTick.bind(i.proxy),
  $watch: i => __VUE_OPTIONS_API__ ? instanceWatch.bind(i) : NOOP
});
const PublicInstanceProxyHandlers = {
  get({
    _: instance
  }, key) {
    const {
      ctx,
      setupState,
      data,
      props,
      accessCache,
      type,
      appContext
    } = instance; // for internal formatters to know that this is a Vue instance

    if (process.env.NODE_ENV !== 'production' && key === '__isVue') {
      return true;
    } // prioritize <script setup> bindings during dev.
    // this allows even properties that start with _ or $ to be used - so that
    // it aligns with the production behavior where the render fn is inlined and
    // indeed has access to all declared variables.


    if (process.env.NODE_ENV !== 'production' && setupState !== EMPTY_OBJ && setupState.__isScriptSetup && hasOwn(setupState, key)) {
      return setupState[key];
    } // data / props / ctx
    // This getter gets called for every property access on the render context
    // during render and is a major hotspot. The most expensive part of this
    // is the multiple hasOwn() calls. It's much faster to do a simple property
    // access on a plain object, so we use an accessCache object (with null
    // prototype) to memoize what access type a key corresponds to.


    let normalizedProps;

    if (key[0] !== '$') {
      const n = accessCache[key];

      if (n !== undefined) {
        switch (n) {
          case 1
          /* SETUP */
          :
            return setupState[key];

          case 2
          /* DATA */
          :
            return data[key];

          case 4
          /* CONTEXT */
          :
            return ctx[key];

          case 3
          /* PROPS */
          :
            return props[key];
          // default: just fallthrough
        }
      } else if (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) {
        accessCache[key] = 1
        /* SETUP */
        ;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        accessCache[key] = 2
        /* DATA */
        ;
        return data[key];
      } else if ( // only cache other properties when instance has declared (thus stable)
      // props
      (normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)) {
        accessCache[key] = 3
        /* PROPS */
        ;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4
        /* CONTEXT */
        ;
        return ctx[key];
      } else if (!__VUE_OPTIONS_API__ || shouldCacheAccess) {
        accessCache[key] = 0
        /* OTHER */
        ;
      }
    }

    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties; // public $xxx properties

    if (publicGetter) {
      if (key === '$attrs') {
        track(instance, "get"
        /* GET */
        , key);
        process.env.NODE_ENV !== 'production' && markAttrsAccessed();
      }

      return publicGetter(instance);
    } else if ( // css module (injected by vue-loader)
    (cssModule = type.__cssModules) && (cssModule = cssModule[key])) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      // user may set custom properties to `this` that start with `$`
      accessCache[key] = 4
      /* CONTEXT */
      ;
      return ctx[key];
    } else if ( // global properties
    globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)) {
      {
        return globalProperties[key];
      }
    } else if (process.env.NODE_ENV !== 'production' && currentRenderingInstance && (!isString(key) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    key.indexOf('__v') !== 0)) {
      if (data !== EMPTY_OBJ && (key[0] === '$' || key[0] === '_') && hasOwn(data, key)) {
        warn(`Property ${JSON.stringify(key)} must be accessed via $data because it starts with a reserved ` + `character ("$" or "_") and is not proxied on the render context.`);
      } else if (instance === currentRenderingInstance) {
        warn(`Property ${JSON.stringify(key)} was accessed during render ` + `but is not defined on instance.`);
      }
    }
  },

  set({
    _: instance
  }, key, value) {
    const {
      data,
      setupState,
      ctx
    } = instance;

    if (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn(instance.props, key)) {
      process.env.NODE_ENV !== 'production' && warn(`Attempting to mutate prop "${key}". Props are readonly.`, instance);
      return false;
    }

    if (key[0] === '$' && key.slice(1) in instance) {
      process.env.NODE_ENV !== 'production' && warn(`Attempting to mutate public property "${key}". ` + `Properties starting with $ are reserved and readonly.`, instance);
      return false;
    } else {
      if (process.env.NODE_ENV !== 'production' && key in instance.appContext.config.globalProperties) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          value
        });
      } else {
        ctx[key] = value;
      }
    }

    return true;
  },

  has({
    _: {
      data,
      setupState,
      accessCache,
      ctx,
      appContext,
      propsOptions
    }
  }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn(data, key) || setupState !== EMPTY_OBJ && hasOwn(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
  },

  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      this.set(target, key, descriptor.get(), null);
    } else if (descriptor.value != null) {
      this.set(target, key, descriptor.value, null);
    }

    return Reflect.defineProperty(target, key, descriptor);
  }

};

if (process.env.NODE_ENV !== 'production' && !false) {
  PublicInstanceProxyHandlers.ownKeys = target => {
    warn(`Avoid app logic that relies on enumerating keys on a component instance. ` + `The keys will be empty in production mode to avoid performance overhead.`);
    return Reflect.ownKeys(target);
  };
}

let currentInstance = null;

const getCurrentInstance = () => currentInstance || currentRenderingInstance;

const setCurrentInstance = instance => {
  currentInstance = instance;
  instance.scope.on();
};

const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  currentInstance = null;
};

function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4
  /* STATEFUL_COMPONENT */
  ;
}

function getExposeProxy(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        } else if (key in publicPropertiesMap) {
          return publicPropertiesMap[key](instance);
        }
      }

    }));
  }
}

const classifyRE = /(?:^|[-_])(\w)/g;

const classify = str => str.replace(classifyRE, c => c.toUpperCase()).replace(/[-_]/g, '');

function getComponentName(Component) {
  return isFunction(Component) ? Component.displayName || Component.name : Component.name;
}
/* istanbul ignore next */


function formatComponentName(instance, Component, isRoot = false) {
  let name = getComponentName(Component);

  if (!name && Component.__file) {
    const match = Component.__file.match(/([^/\\]+)\.\w+$/);

    if (match) {
      name = match[1];
    }
  }

  if (!name && instance && instance.parent) {
    // try to infer the name based on reverse resolution
    const inferFromRegistry = registry => {
      for (const key in registry) {
        if (registry[key] === Component) {
          return key;
        }
      }
    };

    name = inferFromRegistry(instance.components || instance.parent.type.components) || inferFromRegistry(instance.appContext.components);
  }

  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}

function isClassComponent(value) {
  return isFunction(value) && '__vccOpts' in value;
}

Symbol(process.env.NODE_ENV !== 'production' ? `ssrContext` : ``);

function isShallow(value) {
  return !!(value && value["__v_isShallow"
  /* IS_SHALLOW */
  ]);
}

function initCustomFormatter() {
  /* eslint-disable no-restricted-globals */
  if (!(process.env.NODE_ENV !== 'production') || typeof window === 'undefined') {
    return;
  }

  const vueStyle = {
    style: 'color:#3ba776'
  };
  const numberStyle = {
    style: 'color:#0b1bc9'
  };
  const stringStyle = {
    style: 'color:#b62e24'
  };
  const keywordStyle = {
    style: 'color:#9d288c'
  }; // custom formatter for Chrome
  // https://www.mattzeunert.com/2016/02/19/custom-chrome-devtools-object-formatters.html

  const formatter = {
    header(obj) {
      // TODO also format ComponentPublicInstance & ctx.slots/attrs in setup
      if (!isObject(obj)) {
        return null;
      }

      if (obj.__isVue) {
        return ['div', vueStyle, `VueInstance`];
      } else if (isRef(obj)) {
        return ['div', {}, ['span', vueStyle, genRefFlag(obj)], '<', formatValue(obj.value), `>`];
      } else if (isReactive(obj)) {
        return ['div', {}, ['span', vueStyle, isShallow(obj) ? 'ShallowReactive' : 'Reactive'], '<', formatValue(obj), `>${isReadonly(obj) ? ` (readonly)` : ``}`];
      } else if (isReadonly(obj)) {
        return ['div', {}, ['span', vueStyle, isShallow(obj) ? 'ShallowReadonly' : 'Readonly'], '<', formatValue(obj), '>'];
      }

      return null;
    },

    hasBody(obj) {
      return obj && obj.__isVue;
    },

    body(obj) {
      if (obj && obj.__isVue) {
        return ['div', {}, ...formatInstance(obj.$)];
      }
    }

  };

  function formatInstance(instance) {
    const blocks = [];

    if (instance.type.props && instance.props) {
      blocks.push(createInstanceBlock('props', toRaw(instance.props)));
    }

    if (instance.setupState !== EMPTY_OBJ) {
      blocks.push(createInstanceBlock('setup', instance.setupState));
    }

    if (instance.data !== EMPTY_OBJ) {
      blocks.push(createInstanceBlock('data', toRaw(instance.data)));
    }

    const computed = extractKeys(instance, 'computed');

    if (computed) {
      blocks.push(createInstanceBlock('computed', computed));
    }

    const injected = extractKeys(instance, 'inject');

    if (injected) {
      blocks.push(createInstanceBlock('injected', injected));
    }

    blocks.push(['div', {}, ['span', {
      style: keywordStyle.style + ';opacity:0.66'
    }, '$ (internal): '], ['object', {
      object: instance
    }]]);
    return blocks;
  }

  function createInstanceBlock(type, target) {
    target = extend({}, target);

    if (!Object.keys(target).length) {
      return ['span', {}];
    }

    return ['div', {
      style: 'line-height:1.25em;margin-bottom:0.6em'
    }, ['div', {
      style: 'color:#476582'
    }, type], ['div', {
      style: 'padding-left:1.25em'
    }, ...Object.keys(target).map(key => {
      return ['div', {}, ['span', keywordStyle, key + ': '], formatValue(target[key], false)];
    })]];
  }

  function formatValue(v, asRaw = true) {
    if (typeof v === 'number') {
      return ['span', numberStyle, v];
    } else if (typeof v === 'string') {
      return ['span', stringStyle, JSON.stringify(v)];
    } else if (typeof v === 'boolean') {
      return ['span', keywordStyle, v];
    } else if (isObject(v)) {
      return ['object', {
        object: asRaw ? toRaw(v) : v
      }];
    } else {
      return ['span', stringStyle, String(v)];
    }
  }

  function extractKeys(instance, type) {
    const Comp = instance.type;

    if (isFunction(Comp)) {
      return;
    }

    const extracted = {};

    for (const key in instance.ctx) {
      if (isKeyOfType(Comp, key, type)) {
        extracted[key] = instance.ctx[key];
      }
    }

    return extracted;
  }

  function isKeyOfType(Comp, key, type) {
    const opts = Comp[type];

    if (isArray(opts) && opts.includes(key) || isObject(opts) && key in opts) {
      return true;
    }

    if (Comp.extends && isKeyOfType(Comp.extends, key, type)) {
      return true;
    }

    if (Comp.mixins && Comp.mixins.some(m => isKeyOfType(m, key, type))) {
      return true;
    }
  }

  function genRefFlag(v) {
    if (isShallow(v)) {
      return `ShallowRef`;
    }

    if (v.effect) {
      return `ComputedRef`;
    }

    return `Ref`;
  }

  if (window.devtoolsFormatters) {
    window.devtoolsFormatters.push(formatter);
  } else {
    window.devtoolsFormatters = [formatter];
  }
}

function initDev() {
  {
    initCustomFormatter();
  }
} // This entry exports the runtime only, and is built as


if (process.env.NODE_ENV !== 'production') {
  initDev();
}

const stopDefault = e => {
  e.stopPropagation();
  e.preventDefault();
};

function useExpose(api) {
  const instance = getCurrentInstance();

  if (instance) {
    Object.assign(instance.proxy, api);
  }
}

// 节流
const throttle = function (fn, delay = 100, immediate = true) {
  let timer = null;
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        !immediate && fn.apply(this, args);
      }, delay);
      immediate && fn.apply(this, args);
    }
  };
}; // 防抖

var scrollStyles = {"transition":"scroll-module_transition__-it-T"};

var scroll = defineComponent({
  name: 'Scroll',
  props: {
    height: {
      type: String,
      default: '100%'
    },
    slotColor: {
      type: String,
      default: 'transparent'
    },
    class: {
      type: String,
      default: ''
    }
  },

  setup() {
    // 是否移动
    // 及 是否可以复制内容
    const isMove = ref(false);
    const scroll = reactive({
      wrap: undefined,
      main: undefined,
      barSlot: undefined,
      barThumb: undefined,
      wrapHeight: 0,
      mainHeight: 0,
      barThumbHeight: '0%',
      scrollY: '0',
      maxScrollY: 0,
      startY: 0
    });
    /**
     * 页面加载完成 重置 scroll
     */

    onMounted(() => {
      resetScroll();
    });
    /**
     * @description 获取当前页面滚动的距离
     * @returns { x: number, y: number} x轴， y轴
     */

    const getScroll = () => {
      const {
        wrap
      } = scroll;
      return {
        x: 0,
        y: wrap === null || wrap === void 0 ? void 0 : wrap.scrollTop
      };
    };
    /**
     * 重置 scroll
     * scroll view 高度变化
     *  -> 列表分页 加载更多列表
     * 将 resetScroll 抛出
     */


    const resetScroll = () => {
      const {
        wrap,
        main
      } = scroll;
      scroll.wrapHeight = (wrap === null || wrap === void 0 ? void 0 : wrap.clientHeight) || 0;
      scroll.mainHeight = (main === null || main === void 0 ? void 0 : main.clientHeight) || 0;
      /**
       * 重置 scrollthumb 高度
       *  -> 可见高度 / 页面高度 * 100
       *  -> 百分比
       */

      const rate = scroll.wrapHeight / scroll.mainHeight * 100;
      scroll.barThumbHeight = `${rate >= 100 ? 0 : rate}%`;
      /**
       * nextTick 之后
       * 设置滚动槽的最大边界
       *  -> ( 滚动槽高度 - 滚动条高度 ) /  滚动条高度 * 100
       *  -> 百分比 （ 通过 transform translateY(百分比)） 控制
       */

      nextTick(() => {
        const {
          slotHeight,
          thumbHeight
        } = getValue();

        if (thumbHeight != 0) {
          scroll.maxScrollY = (slotHeight - thumbHeight) / thumbHeight * 100;
        }
      });
    };
    /**
     * @description 设置滚动槽滚动距离
     * @description 及设置 transform translateY(百分比)
     * @param top 距离顶部距离
     * @param dot 单位
     */


    const setScrollY = (top, dot = '%') => {
      scroll.scrollY = `${top}${dot}`;
    };
    /**
     * @description 公共方法 获取共用参数
     * @returns scrollTop,slotHeight,thumbHeight,mainHeight,
     */


    const getValue = () => {
      const {
        wrap,
        mainHeight,
        barSlot,
        barThumb
      } = scroll;
      const scrollTop = (wrap === null || wrap === void 0 ? void 0 : wrap.scrollTop) || 0,
            slotHeight = (barSlot === null || barSlot === void 0 ? void 0 : barSlot.clientHeight) || 0,
            thumbHeight = (barThumb === null || barThumb === void 0 ? void 0 : barThumb.clientHeight) || 0;
      /**
       * 可见容器的滚动高度
       * 滚动槽高度
       * 滚动条高度
       * 页面高度
       */

      return {
        scrollTop,
        slotHeight,
        thumbHeight,
        mainHeight
      };
    };

    const computedScrollYBySlot = () => {
      // 获取到需要的参数
      const {
        scrollTop,
        mainHeight,
        slotHeight,
        thumbHeight
      } = getValue();
      /**
       * 计算滚动条滚动高度
       * ( 可见容器的滚动高度 / 页面高度) * 滚动槽高度 / 滚动条高度 * 100
       * -> 百分比
       */

      const scrollYVal = scrollTop / mainHeight * slotHeight / thumbHeight * 100;
      return scrollYVal;
    };
    /**
     * 页面滚动事件
     * 通过节流函数优化 60HZ
     */


    const scrollEvent = throttle(() => {
      const scrollYVal = computedScrollYBySlot();
      /**
       * 调用函数 设置 translate
       */

      setScrollY(scrollYVal);
    }, 60 / 1000, true);
    /**
     * 点击滚动槽位置 滚动到指定距离
     */

    const scrollToBySlot = e => {
      e.stopPropagation();
      e.preventDefault();
      const y = e.clientY;
      const {
        thumbHeight,
        mainHeight,
        slotHeight
      } = getValue();
      /**
       * 设置滚动条高度
       * ( 点击距离 - 滚动条高度 / 2 ) / 滚动条高度 * 100
       * -> 百分比
       */

      const barScrollTop = (y - thumbHeight / 2) / thumbHeight * 100;
      /**
       * 判断边界情况
       *  < 0 = 0
       *  > maxScrollY = maxScrollY
       */

      setScrollY(barScrollTop < 0 ? 0 : barScrollTop > scroll.maxScrollY ? scroll.maxScrollY : barScrollTop);

      if (scroll.wrap) {
        /**
         * 主体视窗 同步滚动
         * ( 点击距离 / 滚动条高度 ) * 页面高度 - 容器可见高度
         */
        scroll.wrap.scrollTo(0, y / slotHeight * mainHeight - scroll.wrap.clientHeight);
      }
    };
    /**
     * 拖动滚动条时 记录点击位置
     * Tip : 需要将已经滚动过的位置减去
     * 防止清空之前滚动的距离
     */


    const setStartY = e => {
      // 获取到 滚动过的距离
      const scrollY = +scroll.scrollY.replace('%', '') / 100 || 0;
      const {
        thumbHeight
      } = getValue();
      /**
       * 点击位置 - 滚动过的距离 * 滚动条高度
       */

      scroll.startY = e.clientY - scrollY * thumbHeight; // 设置可拖动状态

      setMoveStatus(true);
    };
    /**
     * 设置可拖动状态
     */


    const setMoveStatus = move => {
      // 同步到 isMove 变量
      isMove.value = move;
      /**
       * 可拖动
       * 监听 window mousemove 防止用户 将鼠标移出滚动条
       * 监听 window mouseup
       * 		-> 鼠标抬起 设置可拖动状态为false
       * 		-> 移除 window mousemove
       */

      if (isMove.value) {
        window.addEventListener('mousemove', moveByMouse);
        window.addEventListener('mouseup', () => {
          isMove.value = false;
          window.removeEventListener('mousemove', moveByMouse);
        });
      }
    };
    /**
     * 具体拖动方法
     */


    const moveByMouse = throttle(e => {
      // 不是可拖动状态
      if (!isMove.value) return;
      stopDefault(e);
      const {
        startY,
        barSlot
      } = scroll;
      const {
        thumbHeight
      } = getValue();
      /**
       * 设置滚动条的滚动距离
       * ( 滚动距离 - 记录点击距离 ) / 滚动条高度
       */

      const scrollYVal = (e.clientY - startY) / thumbHeight;
      /**
       * 设置 translate
       * 判断边界情况
       *  < 0 = 0
       *  > maxScrollY = maxScrollY
       * 百分比 : 百分比
       */

      setScrollY(scrollYVal < 0 ? 0 : scrollYVal * 100 > scroll.maxScrollY ? scroll.maxScrollY : scrollYVal * 100);

      if (scroll.wrap) {
        var _scroll$main;

        /**
         * 设置主视窗滚动
         * ( 滚动槽滚动距离_百分比 * 滚动调高度) / 滚动槽高度 * 页面高度
         */
        scroll.wrap.scrollTo(0, scrollYVal * thumbHeight / ((barSlot === null || barSlot === void 0 ? void 0 : barSlot.clientHeight) || 0) * (((_scroll$main = scroll.main) === null || _scroll$main === void 0 ? void 0 : _scroll$main.clientHeight) || 0));
      }
    }, 60 / 1000, true);
    /**
     * @description 根据百分比 获取应该滚动多少 px
     * @returns { scrollTop } 滚动多少位置 px
     */

    const getScrollTopByPercentage = percentage => {
      const {
        mainHeight,
        wrapHeight
      } = scroll;
      /**
       * 需要将可视窗口减去
       */

      const scrollTop = percentage / 100 * mainHeight - wrapHeight / 2;
      return scrollTop;
    };

    function scrollTo(x, y) {
      if (typeof x === 'string' && typeof y === 'string') {
        try {
          if (!y.includes('%') && +y) {
            console.warn('The number defaults to percentages');
          }

          const dot = +y.replace(/%/g, '');

          if (isNaN(dot)) {
            throw new Error('Y must be a percentage if it is string');
          } else {
            var _scroll$wrap;

            const scrollTop = getScrollTopByPercentage(dot);
            setScrollY(dot);
            (_scroll$wrap = scroll.wrap) === null || _scroll$wrap === void 0 ? void 0 : _scroll$wrap.scrollTo(+x, scrollTop);
          }
        } catch (e) {
          console.error(e.message);
        }
      } else {
        var _scroll$wrap2;

        (_scroll$wrap2 = scroll.wrap) === null || _scroll$wrap2 === void 0 ? void 0 : _scroll$wrap2.scrollTo(x, y);
        const scrollYVal = computedScrollYBySlot();
        /**
         * 调用函数 设置 translate
         */

        setScrollY(scrollYVal);
      }
    }
    /**
     * Vue3
     * 暴露方法
     */


    useExpose({
      resetScroll,
      scrollTo,
      getScroll
    });
    return { ...toRefs(scroll),
      scrollEvent,
      scrollToBySlot,
      setMoveStatus,
      moveByMouse,
      setStartY,
      isMove
    };
  },

  render() {
    const props = this.$props;
    return createVNode(Fragment, null, [createVNode("div", {
      "class": ['scroll-wrapper relative', this.isMove && 'select-none']
    }, [createVNode("div", {
      "class": ['scroll-main w-full overflow-auto', props.class],
      "ref": 'wrap',
      "style": {
        height: props.height
      },
      "onScroll": this.scrollEvent
    }, [createVNode("div", {
      "class": 'scroll-main__view',
      "ref": 'main'
    }, [renderSlot(this.$slots, 'default')])]), createVNode("div", {
      "class": 'scroll-bar is-vertical absolute right-0.5 top-1 bottom-1 text-right',
      "ref": 'barSlot',
      "onClick": this.scrollToBySlot
    }, [createVNode("div", {
      "class": ['scroll-bar__thumb rounded-md w-2 bg-gray-300 active:bg-gray-400 hover:bg-gray-400 inline-block cursor-pointer opacity-0 group-hover:opacity-100 dark:bg-gray-800 dark:active:bg-gray-900 dark:hover:bg-gray-900', scrollStyles['transition']],
      "ref": 'barThumb',
      "onClick": stopDefault,
      "onMousedown": this.setStartY,
      "onMouseup": this.setMoveStatus.bind(this, false),
      "style": {
        height: this.barThumbHeight,
        transform: `translateY(${this.scrollY})`
      }
    }, null)])])]);
  }

});

// export * from './aside';

var components = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Scroll: scroll
});

function register({
  prefix = '',
  components = []
} = {}) {
  const Registered = [];

  function registerComponent(app, component, name) {
    app.component(prefix + name, component);
  }

  function install(app) {
    if (Registered.includes(app)) return;
    Registered.push(app);
    components.forEach(component => {
      const {
        name
      } = component;
      registerComponent(app, component, name);
    });
  }

  return {
    prefix,
    install
  };
}

var install = register({
  prefix: '',
  components: Object.keys(components).map(key => components[key])
});

exports.Scroll = scroll;
exports["default"] = install;
