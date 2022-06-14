import { defineComponent, ref, createVNode, createTextVNode, computed, renderSlot, Teleport, Transition, Fragment, onMounted, withDirectives, vShow, reactive, inject, vModelDynamic, getCurrentInstance, provide, toRefs, mergeProps, nextTick } from 'vue';

var aside = defineComponent({
  name: 'Aside',

  setup() {
    const loading = ref(true);
    return () => createVNode("div", {
      "class": 'aside p-2 shadow-lg flex-1 w-3/12 ml-10 bg-white rounded-md box-border sticky h-128 top-8 dark:bg-themebgcolor-900 dark:shadow-themebgcolor-700 hidden lg:block'
    }, [createVNode(LSkeleton, {
      "loading": loading.value,
      "items": 3,
      "title": false,
      "time": false
    }, {
      default: () => [createTextVNode("11")]
    })]);
  }

});

var LButton = defineComponent({
  name: 'Button',
  props: {
    size: {
      type: String,
      default: 'sm'
    },
    type: {
      type: String,
      default: 'default'
    },
    plain: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    circle: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click'],

  setup(props, {
    emit
  }) {
    /**
     * 通过 props 计算统一样式
     */
    const buttonClass = computed(() => {
      const classByProps = [];
      classByProps.push(`button--${props.type}`);
      classByProps.push(`button--${props.size}`);
      if (props.disabled) classByProps.push('is-disabled');
      if (props.loading) classByProps.push('is-loading');
      if (props.circle) classByProps.push('is-circle');
      return classByProps.join(' ');
    });
    /**
     * 绑定 Click 事件， 将参数传递
     */

    const emitClick = (...args) => {
      if (props.loading || props.disabled) return;
      emit('click', args);
    };

    return {
      buttonClass,
      emitClick
    };
  },

  render() {
    const props = this.$props;
    return createVNode("button", {
      "class": ['button', this.buttonClass],
      "onClick": this.emitClick
    }, [createVNode("span", null, [renderSlot(this.$slots, 'default'), props.loading && createVNode(LIcon, {
      "icon": 'loading'
    }, null)])]);
  }

});

var dialogAnimate = {"fade-active":"dialog-module_fade-active__BxjTX","fade-to":"dialog-module_fade-to__daTZw","fade-enter":"dialog-module_fade-enter__wGxQB"};

var dialog = defineComponent({
  name: 'Dialog',
  props: {
    title: {
      type: String,
      default: '提示'
    },
    showCancel: {
      type: Boolean,
      default: true
    },
    closeOnModal: {
      type: Boolean,
      default: false
    },
    top: {
      type: String,
      default: '10vh'
    },
    cancelLoading: {
      type: Boolean,
      default: false
    },
    confirmLoading: {
      type: Boolean,
      default: false
    },
    cancelDisabled: {
      type: Boolean,
      default: false
    },
    confirmDisabled: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: false
    }
  },
  emits: ['confirm', 'cancel', 'update:modelValue'],

  setup(props, {
    emit
  }) {
    const hideDialog = () => {
      emit('update:modelValue', false);
    };

    const emitConfirm = () => {
      emit('confirm');
      hideDialog();
    };

    const emitCancel = () => {
      emit('cancel');
      hideDialog();
    };

    return {
      hideDialog,
      emitConfirm,
      emitCancel
    };
  },

  render() {
    return createVNode(Teleport, {
      "to": 'body'
    }, {
      default: () => [createVNode(Transition, {
        "enterFromClass": dialogAnimate['fade-enter'],
        "leaveToClass": dialogAnimate['fade-enter'],
        "enterActiveClass": dialogAnimate['fade-active'],
        "leaveActiveClass": dialogAnimate['fade-active']
      }, {
        default: () => [this.modelValue ? createVNode("div", {
          "class": 'dialog fixed bg-white rounded-md w-72 left-1/2 -translate-x-2/4 z-30 md:w-6/12 lg:w-4/12 dark:bg-themebgcolor-800',
          "style": {
            top: this.top
          }
        }, [createVNode("div", {
          "class": 'dialog-title text-center p-4 text-lg font-semibold dark:text-themebgcolor-300'
        }, [this.$slots.title ? renderSlot(this.$slots, 'title') : '提示']), createVNode("div", {
          "class": 'dialog-content px-4'
        }, [this.$slots.default ? renderSlot(this.$slots, 'default') : 'content']), createVNode("div", {
          "class": 'dialog-footer p-4'
        }, [createVNode("div", {
          "class": ['flex items-center', this.center ? 'justify-center' : 'justify-end']
        }, [this.$slots.footer ? renderSlot(this.$slots, 'footer') : createVNode(Fragment, null, [this.showCancel && createVNode(LButton, {
          "loading": this.cancelLoading,
          "disabled": this.cancelDisabled,
          "onClick": this.emitCancel
        }, {
          default: () => [createTextVNode("\u53D6\u6D88")]
        }), createVNode(LButton, {
          "loading": this.confirmLoading,
          "disabled": this.confirmDisabled,
          "onClick": this.emitConfirm,
          "type": 'primary'
        }, {
          default: () => [createTextVNode("\u786E\u5B9A")]
        })])])])]) : null]
      }), createVNode(LMasker, {
        "show": this.modelValue,
        "onChange": () => {
          this.closeOnModal ? this.hideDialog : null;
        }
      }, null)]
    });
  }

});

var LIcon = defineComponent({
  name: 'Icon',
  props: {
    icon: {
      type: String,
      required: true
    },
    styles: {
      type: String,
      required: false
    }
  },
  emits: ['click'],

  setup(props, {
    emit
  }) {
    const emitClick = (...args) => {
      emit('click', args);
    };

    return () => createVNode("i", {
      "onClick": emitClick,
      "class": ['iconfont', `icon-${props.icon}`, props.styles]
    }, null);
  }

});

var list = {"image-wrapper":"list-module_image-wrapper__AsQSS"};

var index = defineComponent({
  name: 'List',
  props: {
    list: {
      type: [],
      default: () => []
    }
  },

  setup(props, {
    emit
  }) {
    const click = (...args) => {
      emit('click', args);
    };

    return {
      click
    };
  },

  render() {
    return createVNode("ul", {
      "class": 'article-list divide-y shadow-sm divide-gray-200 overflow-hidden dark:divide-gray-700'
    }, [this.$props.list.map(item => createVNode("li", {
      "class": 'article-item group p-5 cursor-pointer hover:bg-themebgcolor-50 dark:hover:bg-themebgcolor-800 dark:hover:bg-opacity-75',
      "onClick": this.click
    }, [createVNode("p", {
      "class": 'article-title text-md font-medium mb-2 truncate group-hover:underline dark:text-gray-400 md:text-xl'
    }, [item.title]), createVNode("div", {
      "class": 'article-content flex text-sm text-gray-500 leading-6 mt-2 md:text-md dark:text-gray-400 md:leading-7'
    }, [createVNode("span", {
      "class": 'inline-block ov-2 md:ov-3'
    }, [item.content]), item.id % 3 ? createVNode("div", {
      "class": ['w-1/6 min-w-min h-8 ml-2 md:ml-6 overflow-hidden rounded-sm md:rounded-md', list['image-wrapper']]
    }, [createVNode("img", {
      "src": item.img,
      "class": 'max-h-full transition-all group-hover:scale-110',
      "alt": ''
    }, null)]) : null]), createVNode("div", {
      "class": 'article-footer flex align-middle text-sm mt-4 text-gray-500 md:text-md'
    }, [createVNode("span", null, [item.time])])]))]);
  }

});

var props$2 = {
  loading: Boolean,
  finished: Boolean,
  finishedText: {
    type: String,
    default: '没有更多了~'
  },
  loadingText: {
    type: String,
    default: '正在加载中...'
  },
  onLoad: Function
};

class ScrollObserver {
  constructor(opt) {
    this.opt = opt;
    this.init();
  }

  init() {
    this.observer = new IntersectionObserver(this.callback.bind(this), {
      root: this.opt.root,
      rootMargin: '0px 0px -140px 0px '
    });
    this.handleObserver();
  }

  callback(entries) {
    // isIntersecting true -> 出现
    //                false -> 隐藏
    if (entries[0].isIntersecting) {
      this.opt.load();
    }
  }

  handleObserver() {
    var _this$observer;

    (_this$observer = this.observer) === null || _this$observer === void 0 ? void 0 : _this$observer.observe(this.opt.obs);
  }

  cancelObserver() {
    var _this$observer2;

    (_this$observer2 = this.observer) === null || _this$observer2 === void 0 ? void 0 : _this$observer2.unobserve(this.opt.obs);
  }

}

var loading = defineComponent({
  name: 'Loading',
  props: props$2,

  setup(props, {
    emit
  }) {
    const obs = ref();
    onMounted(() => {
      const observer = new ScrollObserver({
        root: null,
        obs: obs.value,

        load() {
          if (!props.loading) {
            emit('load');
          }

          if (props.finished) {
            observer.cancelObserver();
          }
        }

      });
    });
    return {
      obs
    };
  },

  render() {
    const props = this.$props;
    return createVNode(Fragment, null, [renderSlot(this.$slots, 'default'), createVNode("div", {
      "ref": 'obs',
      "class": 'leading-loose text-center text-sm py-4 text-gray-600 dark:text-gray-500'
    }, [props.finished ? props.finishedText : props.loadingText])]);
  }

});

var maskAnimate = {"fade-active":"mask-module_fade-active__B-CtN","fade-to":"mask-module_fade-to__PWjKp","fade-enter":"mask-module_fade-enter__yEDWT"};

var LMasker = defineComponent({
  name: 'Masker',
  props: {
    show: {
      type: Boolean
    },
    lock: {
      type: Boolean,
      default: true
    }
  },
  emits: ['change'],

  setup(props, {
    emit
  }) {
    const hiddenMask = () => {
      emit('change', false);
    };

    const touchHandle = e => {
      e.stopPropagation();

      if (props.lock) {
        e.preventDefault();
        return false;
      }
    };

    return {
      hiddenMask,
      touchHandle
    };
  },

  render() {
    const props = this.$props;
    return createVNode(Teleport, {
      "to": 'body'
    }, {
      default: () => [createVNode(Transition, {
        "enterFromClass": maskAnimate['fade-enter'],
        "leaveToClass": maskAnimate['fade-enter'],
        "enterActiveClass": maskAnimate['fade-active'],
        "leaveActiveClass": maskAnimate['fade-active']
      }, {
        default: () => [props.show && withDirectives(createVNode("div", {
          "class": ['mask fixed left-0 right-0 top-0 bottom-0 select-none bg-black bg-opacity-60 z-20 dark:bg-opacity-70'],
          "onTouchmove": this.touchHandle,
          "onClick": this.hiddenMask,
          "key": Number(props.show)
        }, null), [[vShow, props.show]])]
      })]
    });
  }

});

var side = {"group":"side-module_group__wp3Ue","side-tips":"side-module_side-tips__QTZF7","group-hover":"side-module_group-hover__x6rhj","group-click":"side-module_group-click__D3-i1"};

const Navbar = defineComponent({
  name: 'Navbar',
  props: {
    category: {
      type: [],
      required: true
    }
  },

  setup() {
    const slideBooleanList = reactive([]);

    const slideShow = i => {
      for (let item of slideBooleanList) {
        item = false;
      }

      slideBooleanList[i] = true;
    };

    const slideHide = i => {
      slideBooleanList[i] = false;
    };

    return {
      slideShow,
      slideHide,
      slideBooleanList
    };
  },

  render() {
    const main = createTree.call(this, this.category);
    return createVNode("div", null, [createVNode("div", {
      "class": 'main'
    }, [createVNode("ul", {
      "class": 'flex relative pr-6 '
    }, [main])])]);
  }

});

function createTree(tree) {
  if (!tree.length) return null;
  return createVNode(Fragment, null, [tree.map((item, index) => {
    return createVNode("li", {
      "class": ['py-4 px-2 cursor-pointer relative group group-hover md:px-4', side['group']],
      "onMouseover": this.slideShow.bind(this, index),
      "onMouseout": this.slideHide.bind(this, index)
    }, [createVNode("span", {
      "class": ['text-sm inline-block border-themetextcolor-500 cursor-pointer box-border group-hover:border-b-2 dark:border-themetextcolor-300', item.children ? side['side-tips'] : null]
    }, [item.name]), item.children ? createVNode("ul", {
      "class": ['flex-col absolute top-3/4 mt-2 py-2 rounded-md bg-white left-1/2 -translate-x-1/2 border-gray-200 border dark:bg-themebgcolor-900 dark:border-themebgcolor-500', this.slideBooleanList[index] ? 'block' : 'hidden']
    }, [item.children.map(c => createVNode("li", {
      "class": 'whitespace-nowrap px-4 text-sm py-1.5 hover:text-themetextcolor-500 dark:hover:text-themetextcolor-300'
    }, [c.name]))]) : null]);
  })]);
}

var sideAnimate = {"translate-active":"side-module_translate-active__yujGF","translate-to":"side-module_translate-to__WbmUh","translate-enter":"side-module_translate-enter__bjwX5"};

const Sidebar = defineComponent({
  name: 'Sidebar',
  props: {
    category: {
      type: [],
      required: true
    },
    modelValue: {
      type: Boolean
    }
  },
  emits: ['update:modelValue'],

  setup(props, {
    emit
  }) {
    const activedIndex = ref(-1);

    const changeCollapse = flag => {
      emit('update:modelValue', flag);
    };

    const collapseSideByIndex = index => {
      activedIndex.value = index == activedIndex.value ? -1 : index;
    };

    return {
      changeCollapse,
      activedIndex,
      collapseSideByIndex
    };
  },

  render() {
    const props = this.$props;
    return createVNode(Teleport, {
      "to": '#app'
    }, {
      default: () => [createVNode(Transition, {
        "enterFromClass": sideAnimate['translate-enter'],
        "leaveToClass": sideAnimate['translate-enter'],
        "enterActiveClass": sideAnimate['translate-active'],
        "leaveActiveClass": sideAnimate['translate-active']
      }, {
        default: () => [withDirectives(createVNode("aside", {
          "class": 'fixed top-0 left-0 bottom-0 w-1/2 bg-white z-30 dark:bg-themebgcolor-900'
        }, [createVNode("main", {
          "class": 'side-main text-center h-full box-border pt-16'
        }, [createVNode("h1", {
          "class": 'text-2xl mb-8'
        }, [createTextVNode("Title")]), createVNode("ul", null, [renderCategory.call(this)])])]), [[vShow, props.modelValue]])]
      }), createVNode(LMasker, {
        "show": props.modelValue,
        "onChange": this.changeCollapse
      }, null)]
    });
  }

});

const renderCategory = function () {
  const props = this.$props;
  return createVNode(Fragment, null, [props.category.map((item, index) => createVNode("li", {
    "class": ['py-2 relative group', side['group'], this.activedIndex == index && side['group-click']],
    "onClick": this.collapseSideByIndex.bind(this, index)
  }, [createVNode("span", {
    "class": ['inline-block border-themetextcolor-300 border-opacity-0 border-b-2 py-2 text-sm', item.children ? side['side-tips'] : null, this.activedIndex == index && ' border-opacity-100']
  }, [item.name]), item.children ? createVNode("ul", {
    "class": ['h-0 overflow-hidden max-h-0 transition-all duration-300 ', this.activedIndex == index && 'bg-themebgcolor-100 py-4 dark:bg-themebgcolor-800 h-auto max-h-48']
  }, [item.children.map(c => createVNode("li", {
    "class": 'text-xs leading-10 cursor-pointer'
  }, [c.name]))]) : null]))]);
};

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

const debounce = function (fn, delay = 100, immediate = true) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    immediate && !timer && fn.apply(this, args);
    timer = setTimeout(() => {
      timer = null;
      !immediate && fn.apply(this, args);
    }, delay);
  };
};

const MOBILE = 480;
const useResize = () => {
  const isMobile = ref(isMobileHandle());
  window.addEventListener('resize', throttle(() => {
    isMobile.value = isMobileHandle();
  }));
  return isMobile;
};
const resizeHandle = () => {
  return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
};
const isMobileHandle = () => {
  const windowWidth = resizeHandle();
  return windowWidth < MOBILE;
};

const isMobile = useResize();
var LSkeleton = defineComponent({
  name: 'Skeleton',
  props: {
    rows: {
      type: Number,
      default: isMobile.value ? 2 : 3
    },
    rowWidth: {
      type: [Array, Number, String],
      default: '100%'
    },
    items: {
      type: Number,
      default: 1
    },
    title: {
      type: Boolean,
      default: true
    },
    image: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    time: {
      type: Boolean,
      default: true
    }
  },

  render() {
    const props = this.$props;

    const renderTitle = () => {
      return props.title ? createVNode("div", {
        "class": 'skeletion-item bg-gray-100 h-4 mb-4 md:h-6 md:mb-6 dark:bg-themebgcolor-500'
      }, null) : null;
    };

    const renderContent = () => {
      return new Array(props.rows).fill(1).map((r, index) => createVNode("div", {
        "class": 'skeletion-item bg-gray-100 h-3 mb-4 md:h-4 md:mb-4 dark:bg-themebgcolor-500',
        "style": {
          width: getPropsWidth(props.rowWidth, index)
        }
      }, null));
    };

    const renderImage = () => {
      return props.image ? createVNode("div", {
        "class": 'skeleton-image__wrapper'
      }, [createVNode("div", {
        "class": 'skeleton-image w-24 ml-4 h-10 bg-gray-100 md:w-44 md:h-20 md:ml-6 dark:bg-themebgcolor-500'
      }, null)]) : null;
    };

    const renderTime = () => {
      return props.time ? createVNode("div", {
        "class": 'skeletion-item bg-gray-100 h-2 w-28 mt-1 md:h-3 md:mt-2 dark:bg-themebgcolor-500'
      }, null) : null;
    };

    return createVNode(Fragment, null, [props.loading ? new Array(props.items).fill(1).map(() => createVNode("div", {
      "class": 'skeleton p-4 animate-pulse'
    }, [renderTitle(), createVNode("div", {
      "class": 'skeleton-content flex'
    }, [createVNode("div", {
      "class": 'skeleton-main flex-1'
    }, [renderContent()]), renderImage()]), renderTime()])) : renderSlot(this.$slots, 'default')]);
  }

});

const getPropsWidth = (rowWidth, index) => {
  let width = '100%';

  if (typeof rowWidth === 'string') {
    width = rowWidth;
  }

  if (typeof rowWidth === 'number') {
    width = rowWidth + 'px';
  }

  if (Array.isArray(rowWidth)) {
    width = rowWidth[index] ? getPropsWidth(rowWidth[index], index) : '100%';
  }

  return width;
};

var props$1 = {
  placeholder: {
    type: String,
    default: '请输入'
  },
  clearable: {
    type: Boolean,
    default: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  value: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  error: {
    type: Boolean,
    default: false
  },
  errorPlaceholder: {
    type: String,
    default: '请输入'
  },
  prefixIcon: String,
  suffixIcon: String,
  modelValue: {
    type: [String, Number],
    required: true
  }
};

var inputStyles = {"input__error":"input-module_input__error__Jl-DS","is-disabled":"input-module_is-disabled__AQTqq","fade-active":"input-module_fade-active__CYZ4g","fade-to":"input-module_fade-to__ddUDl","fade-enter":"input-module_fade-enter__XrYUR"};

var input = defineComponent({
  name: 'Input',
  props: props$1,
  emits: ['update:modelValue'],

  setup(props, {
    slots,
    emit
  }) {
    const inputEl = ref();
    const show = ref();
    const isFocus = ref();
    const isShow = computed(() => {
      return Boolean(props.modelValue) && Boolean(show.value);
    }); // 注入 form item

    const formItem = inject('formItemProvide'); // 触发 form item 的效验方法

    const triggerFormItemValidate = () => {
      formItem && formItem.emitter.emit('validate');
    }; // 渲染 尾部


    const renderPrefixIcon = () => {
      const prefixClass = 'bottom-0 left-0.5 top-0 absolute w-8 flex justify-center items-center text-gray-400';
      if (slots.prefix) return createVNode("span", {
        "class": ['input--prefix', prefixClass]
      }, [renderSlot(slots, 'prefix')]);
      if (props.prefixIcon) return createVNode("span", {
        "class": ['input--prefix__icon', prefixClass]
      }, [createVNode(LIcon, {
        "icon": props.prefixIcon
      }, null)]);
      return null;
    }; // 渲染头部


    const renderSuffix = () => {
      if (props.clearable) return createVNode(Transition, {
        "enterFromClass": inputStyles['fade-enter'],
        "leaveToClass": inputStyles['fade-enter'],
        "enterActiveClass": inputStyles['fade-active'],
        "leaveActiveClass": inputStyles['fade-active']
      }, {
        default: () => [isShow.value ? createVNode(LIcon, {
          "onClick": () => {
            emit('update:modelValue', '');
            triggerFormItemValidate();
          },
          "icon": 'roundclose',
          "class": 'absolute flex z-10 text-gray-300 right-0 top-0 h-full w-8  justify-center items-center cursor-pointer hover:text-gray-400 group-active:flex  dark:text-gray-400 dark:hover:text-gray-300'
        }, null) : null]
      });
      if (slots.suffix) return createVNode("span", {
        "class": 'input--suffix bottom-0 right-0.5 top-0 absolute w-8 flex justify-center items-center text-gray-400'
      }, [renderSlot(slots, 'suffix')]);
      if (props.suffixIcon) return createVNode("span", {
        "class": 'input--suffix__icon'
      }, [createVNode(LIcon, {
        "icon": props.suffixIcon
      }, null)]);
      return null;
    }; // 发送事件


    const emitInput = debounce(e => {
      const target = e.target;
      emit('update:modelValue', target.value);
      triggerFormItemValidate();
    }, 100, false);
    /**
     * wrapper mouseover 事件
     * 判断 clearable icon 是否显示
     */

    const wrapperHover = () => {
      show.value = true;
    };
    /**
     * wrapper mouseleave 事件
     * 判断 clearable icon 是否显示
     */


    const wrapperLeave = () => {
      // 如果是获取焦点状态 则一直展示 icon
      if (!isFocus.value) {
        show.value = false;
      }
    };
    /**
     * wrapper down 事件
     * 最先执行 > clearable icon Click
     * 防止 input 边框闪烁 并自动获取焦点
     */


    const wrapperDown = () => {
      setTimeout(() => {
        var _inputEl$value;

        (_inputEl$value = inputEl.value) === null || _inputEl$value === void 0 ? void 0 : _inputEl$value.focus();
      });
    };
    /**
     * 获取 input 获取焦点事件
     */


    const inputFocus = () => {
      isFocus.value = true;
    };
    /**
     * 获取 input 失去焦点事件
     */


    const inputBlur = () => {
      isFocus.value = false; // 调用 wrapperLeave 事件

      wrapperLeave();
      triggerFormItemValidate();
    };

    return () => createVNode("div", {
      "class": ['input group relative', props.disabled && inputStyles['is-disabled']],
      "onMouseover": wrapperHover,
      "onMouseout": wrapperLeave,
      "onMousedown": wrapperDown
    }, [renderPrefixIcon(), withDirectives(createVNode("input", {
      "class": [`input__inner outline-none bg-white block w-full rounded border px-4 py-2 text-sm hover:border-gray-400 focus:border-themetextcolor-500 placeholder-gray-300 transition-all text-gray-600 dark:bg-themebgcolor-800 dark:border-themebgcolor-600 caret-themebgcolor-400 dark:text-gray-400 dark:hover:border-themebgcolor-500 dark:focus:border-themetextcolor-600 dark:placeholder-gray-400`, props.error && inputStyles['input__error'], (props.prefixIcon || slots.prefix) && 'pl-8', (props.clearable || props.suffixIcon || slots.suffix) && 'pr-8'],
      "data-type": 'input',
      "type": props.type,
      "placeholder": props.placeholder,
      "value": props.modelValue,
      "onUpdate:modelValue": $event => props.modelValue = $event,
      "onInput": emitInput,
      "disabled": props.disabled,
      "ref": inputEl,
      "onFocus": inputFocus,
      "onBlur": inputBlur
    }, null), [[vModelDynamic, props.modelValue]]), renderSuffix()]);
  }

});

var props = {
  model: {
    type: Object,
    required: true
  },
  rules: {
    type: Object
  },
  inline: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: 'right'
  },
  labelWidth: {
    type: String
  },
  labelSuffix: {
    type: String
  },
  disabled: {
    type: Boolean
  }
};

// 定义 Symbol key
const key = Symbol('formProp');

function mitt(n){return {all:n=n||new Map,on:function(t,e){var i=n.get(t);i?i.push(e):n.set(t,[e]);},off:function(t,e){var i=n.get(t);i&&(e?i.splice(i.indexOf(e)>>>0,1):n.set(t,[]));},emit:function(t,e){var i=n.get(t);i&&i.slice().map(function(n){n(e);}),(i=n.get("*"))&&i.slice().map(function(n){n(t,e);});}}}

const emitter = mitt();

var formStyle = {"form__inline":"form-module_form__inline__ohp9I"};

function useExpose(api) {
  const instance = getCurrentInstance();

  if (instance) {
    Object.assign(instance.proxy, api);
  }
}

const Form = defineComponent({
  name: 'Form',
  props,

  setup(props, {
    slots
  }) {
    const items = ref([]);
    /**
     * 对每个 item 进行效验
     */

    const validate = cb => {
      const tasks = items.value.map(item => item.validate());
      Promise.all(tasks).then(() => {
        cb(true);
      }).catch(() => {
        cb(false);
      });
    }; // 监听 formItem 事件
    // 将当前 formItem 添加到数组中
    // 通过 validate 对每个 item 进行 效验


    emitter.on('formItem', item => {
      items.value.push(item);
    });

    if (props.model) {
      // 注入当前的绑定的数据
      // 以及当前的规则
      provide(key, {
        model: props.model,
        rules: props.rules
      });
    } // 暴露验证方法


    useExpose({
      validate
    });
    return () => createVNode("form", {
      "class": ['form', props.inline && formStyle['form__inline']]
    }, [renderSlot(slots, 'default')]);
  }

});

var FormItemProp = {
  prop: {
    type: String
  },
  label: {
    type: String
  },
  labelWidth: {
    type: String
  },
  required: {
    type: Boolean,
    default: false
  },
  rules: {
    type: Object
  }
};

var itemStyles = {"is-required":"formItem-module_is-required__BPe73","is-error":"formItem-module_is-error__NwII8","fade-active":"formItem-module_fade-active__LK1th","fade-to":"formItem-module_fade-to__orH-C","fade-enter":"formItem-module_fade-enter__YKEYW"};

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}
/* eslint no-console:0 */


var formatRegExp = /%[sdj%]/g;

var warning = function warning() {}; // don't print warning message when in production env or node runtime


if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV !== 'production' && typeof window !== 'undefined' && typeof document !== 'undefined') {
  warning = function warning(type, errors) {
    if (typeof console !== 'undefined' && console.warn && typeof ASYNC_VALIDATOR_NO_WARNING === 'undefined') {
      if (errors.every(function (e) {
        return typeof e === 'string';
      })) {
        console.warn(type, errors);
      }
    }
  };
}

function convertFieldsError(errors) {
  if (!errors || !errors.length) return null;
  var fields = {};
  errors.forEach(function (error) {
    var field = error.field;
    fields[field] = fields[field] || [];
    fields[field].push(error);
  });
  return fields;
}

function format(template) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  var i = 0;
  var len = args.length;

  if (typeof template === 'function') {
    return template.apply(null, args);
  }

  if (typeof template === 'string') {
    var str = template.replace(formatRegExp, function (x) {
      if (x === '%%') {
        return '%';
      }

      if (i >= len) {
        return x;
      }

      switch (x) {
        case '%s':
          return String(args[i++]);

        case '%d':
          return Number(args[i++]);

        case '%j':
          try {
            return JSON.stringify(args[i++]);
          } catch (_) {
            return '[Circular]';
          }

          break;

        default:
          return x;
      }
    });
    return str;
  }

  return template;
}

function isNativeStringType(type) {
  return type === 'string' || type === 'url' || type === 'hex' || type === 'email' || type === 'date' || type === 'pattern';
}

function isEmptyValue(value, type) {
  if (value === undefined || value === null) {
    return true;
  }

  if (type === 'array' && Array.isArray(value) && !value.length) {
    return true;
  }

  if (isNativeStringType(type) && typeof value === 'string' && !value) {
    return true;
  }

  return false;
}

function asyncParallelArray(arr, func, callback) {
  var results = [];
  var total = 0;
  var arrLength = arr.length;

  function count(errors) {
    results.push.apply(results, errors || []);
    total++;

    if (total === arrLength) {
      callback(results);
    }
  }

  arr.forEach(function (a) {
    func(a, count);
  });
}

function asyncSerialArray(arr, func, callback) {
  var index = 0;
  var arrLength = arr.length;

  function next(errors) {
    if (errors && errors.length) {
      callback(errors);
      return;
    }

    var original = index;
    index = index + 1;

    if (original < arrLength) {
      func(arr[original], next);
    } else {
      callback([]);
    }
  }

  next([]);
}

function flattenObjArr(objArr) {
  var ret = [];
  Object.keys(objArr).forEach(function (k) {
    ret.push.apply(ret, objArr[k] || []);
  });
  return ret;
}

var AsyncValidationError = /*#__PURE__*/function (_Error) {
  _inheritsLoose(AsyncValidationError, _Error);

  function AsyncValidationError(errors, fields) {
    var _this;

    _this = _Error.call(this, 'Async Validation Error') || this;
    _this.errors = errors;
    _this.fields = fields;
    return _this;
  }

  return AsyncValidationError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

function asyncMap(objArr, option, func, callback, source) {
  if (option.first) {
    var _pending = new Promise(function (resolve, reject) {
      var next = function next(errors) {
        callback(errors);
        return errors.length ? reject(new AsyncValidationError(errors, convertFieldsError(errors))) : resolve(source);
      };

      var flattenArr = flattenObjArr(objArr);
      asyncSerialArray(flattenArr, func, next);
    });

    _pending["catch"](function (e) {
      return e;
    });

    return _pending;
  }

  var firstFields = option.firstFields === true ? Object.keys(objArr) : option.firstFields || [];
  var objArrKeys = Object.keys(objArr);
  var objArrLength = objArrKeys.length;
  var total = 0;
  var results = [];
  var pending = new Promise(function (resolve, reject) {
    var next = function next(errors) {
      results.push.apply(results, errors);
      total++;

      if (total === objArrLength) {
        callback(results);
        return results.length ? reject(new AsyncValidationError(results, convertFieldsError(results))) : resolve(source);
      }
    };

    if (!objArrKeys.length) {
      callback(results);
      resolve(source);
    }

    objArrKeys.forEach(function (key) {
      var arr = objArr[key];

      if (firstFields.indexOf(key) !== -1) {
        asyncSerialArray(arr, func, next);
      } else {
        asyncParallelArray(arr, func, next);
      }
    });
  });
  pending["catch"](function (e) {
    return e;
  });
  return pending;
}

function isErrorObj(obj) {
  return !!(obj && obj.message !== undefined);
}

function getValue(value, path) {
  var v = value;

  for (var i = 0; i < path.length; i++) {
    if (v == undefined) {
      return v;
    }

    v = v[path[i]];
  }

  return v;
}

function complementError(rule, source) {
  return function (oe) {
    var fieldValue;

    if (rule.fullFields) {
      fieldValue = getValue(source, rule.fullFields);
    } else {
      fieldValue = source[oe.field || rule.fullField];
    }

    if (isErrorObj(oe)) {
      oe.field = oe.field || rule.fullField;
      oe.fieldValue = fieldValue;
      return oe;
    }

    return {
      message: typeof oe === 'function' ? oe() : oe,
      fieldValue: fieldValue,
      field: oe.field || rule.fullField
    };
  };
}

function deepMerge(target, source) {
  if (source) {
    for (var s in source) {
      if (source.hasOwnProperty(s)) {
        var value = source[s];

        if (typeof value === 'object' && typeof target[s] === 'object') {
          target[s] = _extends({}, target[s], value);
        } else {
          target[s] = value;
        }
      }
    }
  }

  return target;
}

var required$1 = function required(rule, value, source, errors, options, type) {
  if (rule.required && (!source.hasOwnProperty(rule.field) || isEmptyValue(value, type || rule.type))) {
    errors.push(format(options.messages.required, rule.fullField));
  }
};
/**
 *  Rule for validating whitespace.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */


var whitespace = function whitespace(rule, value, source, errors, options) {
  if (/^\s+$/.test(value) || value === '') {
    errors.push(format(options.messages.whitespace, rule.fullField));
  }
};
/* eslint max-len:0 */


var pattern$2 = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
  url: new RegExp("^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$", 'i'),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
};
var types = {
  integer: function integer(value) {
    return types.number(value) && parseInt(value, 10) === value;
  },
  "float": function float(value) {
    return types.number(value) && !types.integer(value);
  },
  array: function array(value) {
    return Array.isArray(value);
  },
  regexp: function regexp(value) {
    if (value instanceof RegExp) {
      return true;
    }

    try {
      return !!new RegExp(value);
    } catch (e) {
      return false;
    }
  },
  date: function date(value) {
    return typeof value.getTime === 'function' && typeof value.getMonth === 'function' && typeof value.getYear === 'function' && !isNaN(value.getTime());
  },
  number: function number(value) {
    if (isNaN(value)) {
      return false;
    }

    return typeof value === 'number';
  },
  object: function object(value) {
    return typeof value === 'object' && !types.array(value);
  },
  method: function method(value) {
    return typeof value === 'function';
  },
  email: function email(value) {
    return typeof value === 'string' && value.length <= 320 && !!value.match(pattern$2.email);
  },
  url: function url(value) {
    return typeof value === 'string' && value.length <= 2048 && !!value.match(pattern$2.url);
  },
  hex: function hex(value) {
    return typeof value === 'string' && !!value.match(pattern$2.hex);
  }
};

var type$1 = function type(rule, value, source, errors, options) {
  if (rule.required && value === undefined) {
    required$1(rule, value, source, errors, options);
    return;
  }

  var custom = ['integer', 'float', 'array', 'regexp', 'object', 'method', 'email', 'number', 'date', 'url', 'hex'];
  var ruleType = rule.type;

  if (custom.indexOf(ruleType) > -1) {
    if (!types[ruleType](value)) {
      errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
    } // straight typeof check

  } else if (ruleType && typeof value !== rule.type) {
    errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
  }
};

var range = function range(rule, value, source, errors, options) {
  var len = typeof rule.len === 'number';
  var min = typeof rule.min === 'number';
  var max = typeof rule.max === 'number'; // 正则匹配码点范围从U+010000一直到U+10FFFF的文字（补充平面Supplementary Plane）

  var spRegexp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
  var val = value;
  var key = null;
  var num = typeof value === 'number';
  var str = typeof value === 'string';
  var arr = Array.isArray(value);

  if (num) {
    key = 'number';
  } else if (str) {
    key = 'string';
  } else if (arr) {
    key = 'array';
  } // if the value is not of a supported type for range validation
  // the validation rule rule should use the
  // type property to also test for a particular type


  if (!key) {
    return false;
  }

  if (arr) {
    val = value.length;
  }

  if (str) {
    // 处理码点大于U+010000的文字length属性不准确的bug，如"𠮷𠮷𠮷".lenght !== 3
    val = value.replace(spRegexp, '_').length;
  }

  if (len) {
    if (val !== rule.len) {
      errors.push(format(options.messages[key].len, rule.fullField, rule.len));
    }
  } else if (min && !max && val < rule.min) {
    errors.push(format(options.messages[key].min, rule.fullField, rule.min));
  } else if (max && !min && val > rule.max) {
    errors.push(format(options.messages[key].max, rule.fullField, rule.max));
  } else if (min && max && (val < rule.min || val > rule.max)) {
    errors.push(format(options.messages[key].range, rule.fullField, rule.min, rule.max));
  }
};

var ENUM$1 = 'enum';

var enumerable$1 = function enumerable(rule, value, source, errors, options) {
  rule[ENUM$1] = Array.isArray(rule[ENUM$1]) ? rule[ENUM$1] : [];

  if (rule[ENUM$1].indexOf(value) === -1) {
    errors.push(format(options.messages[ENUM$1], rule.fullField, rule[ENUM$1].join(', ')));
  }
};

var pattern$1 = function pattern(rule, value, source, errors, options) {
  if (rule.pattern) {
    if (rule.pattern instanceof RegExp) {
      // if a RegExp instance is passed, reset `lastIndex` in case its `global`
      // flag is accidentally set to `true`, which in a validation scenario
      // is not necessary and the result might be misleading
      rule.pattern.lastIndex = 0;

      if (!rule.pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    } else if (typeof rule.pattern === 'string') {
      var _pattern = new RegExp(rule.pattern);

      if (!_pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    }
  }
};

var rules = {
  required: required$1,
  whitespace: whitespace,
  type: type$1,
  range: range,
  "enum": enumerable$1,
  pattern: pattern$1
};

var string = function string(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, 'string') && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options, 'string');

    if (!isEmptyValue(value, 'string')) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
      rules.pattern(rule, value, source, errors, options);

      if (rule.whitespace === true) {
        rules.whitespace(rule, value, source, errors, options);
      }
    }
  }

  callback(errors);
};

var method = function method(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
};

var number = function number(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (value === '') {
      value = undefined;
    }

    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
};

var _boolean = function _boolean(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
};

var regexp = function regexp(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (!isEmptyValue(value)) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
};

var integer = function integer(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
};

var floatFn = function floatFn(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
};

var array = function array(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if ((value === undefined || value === null) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options, 'array');

    if (value !== undefined && value !== null) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
};

var object = function object(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
};

var ENUM = 'enum';

var enumerable = function enumerable(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules[ENUM](rule, value, source, errors, options);
    }
  }

  callback(errors);
};

var pattern = function pattern(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, 'string') && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (!isEmptyValue(value, 'string')) {
      rules.pattern(rule, value, source, errors, options);
    }
  }

  callback(errors);
};

var date = function date(rule, value, callback, source, options) {
  // console.log('integer rule called %j', rule);
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field); // console.log('validate on %s value', value);

  if (validate) {
    if (isEmptyValue(value, 'date') && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (!isEmptyValue(value, 'date')) {
      var dateObject;

      if (value instanceof Date) {
        dateObject = value;
      } else {
        dateObject = new Date(value);
      }

      rules.type(rule, dateObject, source, errors, options);

      if (dateObject) {
        rules.range(rule, dateObject.getTime(), source, errors, options);
      }
    }
  }

  callback(errors);
};

var required = function required(rule, value, callback, source, options) {
  var errors = [];
  var type = Array.isArray(value) ? 'array' : typeof value;
  rules.required(rule, value, source, errors, options, type);
  callback(errors);
};

var type = function type(rule, value, callback, source, options) {
  var ruleType = rule.type;
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, ruleType) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options, ruleType);

    if (!isEmptyValue(value, ruleType)) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
};

var any = function any(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);
  }

  callback(errors);
};

var validators = {
  string: string,
  method: method,
  number: number,
  "boolean": _boolean,
  regexp: regexp,
  integer: integer,
  "float": floatFn,
  array: array,
  object: object,
  "enum": enumerable,
  pattern: pattern,
  date: date,
  url: type,
  hex: type,
  email: type,
  required: required,
  any: any
};

function newMessages() {
  return {
    "default": 'Validation error on field %s',
    required: '%s is required',
    "enum": '%s must be one of %s',
    whitespace: '%s cannot be empty',
    date: {
      format: '%s date %s is invalid for format %s',
      parse: '%s date could not be parsed, %s is invalid ',
      invalid: '%s date %s is invalid'
    },
    types: {
      string: '%s is not a %s',
      method: '%s is not a %s (function)',
      array: '%s is not an %s',
      object: '%s is not an %s',
      number: '%s is not a %s',
      date: '%s is not a %s',
      "boolean": '%s is not a %s',
      integer: '%s is not an %s',
      "float": '%s is not a %s',
      regexp: '%s is not a valid %s',
      email: '%s is not a valid %s',
      url: '%s is not a valid %s',
      hex: '%s is not a valid %s'
    },
    string: {
      len: '%s must be exactly %s characters',
      min: '%s must be at least %s characters',
      max: '%s cannot be longer than %s characters',
      range: '%s must be between %s and %s characters'
    },
    number: {
      len: '%s must equal %s',
      min: '%s cannot be less than %s',
      max: '%s cannot be greater than %s',
      range: '%s must be between %s and %s'
    },
    array: {
      len: '%s must be exactly %s in length',
      min: '%s cannot be less than %s in length',
      max: '%s cannot be greater than %s in length',
      range: '%s must be between %s and %s in length'
    },
    pattern: {
      mismatch: '%s value %s does not match pattern %s'
    },
    clone: function clone() {
      var cloned = JSON.parse(JSON.stringify(this));
      cloned.clone = this.clone;
      return cloned;
    }
  };
}

var messages = newMessages();
/**
 *  Encapsulates a validation schema.
 *
 *  @param descriptor An object declaring validation rules
 *  for this schema.
 */

var Schema = /*#__PURE__*/function () {
  // ========================= Static =========================
  // ======================== Instance ========================
  function Schema(descriptor) {
    this.rules = null;
    this._messages = messages;
    this.define(descriptor);
  }

  var _proto = Schema.prototype;

  _proto.define = function define(rules) {
    var _this = this;

    if (!rules) {
      throw new Error('Cannot configure a schema with no rules');
    }

    if (typeof rules !== 'object' || Array.isArray(rules)) {
      throw new Error('Rules must be an object');
    }

    this.rules = {};
    Object.keys(rules).forEach(function (name) {
      var item = rules[name];
      _this.rules[name] = Array.isArray(item) ? item : [item];
    });
  };

  _proto.messages = function messages(_messages) {
    if (_messages) {
      this._messages = deepMerge(newMessages(), _messages);
    }

    return this._messages;
  };

  _proto.validate = function validate(source_, o, oc) {
    var _this2 = this;

    if (o === void 0) {
      o = {};
    }

    if (oc === void 0) {
      oc = function oc() {};
    }

    var source = source_;
    var options = o;
    var callback = oc;

    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    if (!this.rules || Object.keys(this.rules).length === 0) {
      if (callback) {
        callback(null, source);
      }

      return Promise.resolve(source);
    }

    function complete(results) {
      var errors = [];
      var fields = {};

      function add(e) {
        if (Array.isArray(e)) {
          var _errors;

          errors = (_errors = errors).concat.apply(_errors, e);
        } else {
          errors.push(e);
        }
      }

      for (var i = 0; i < results.length; i++) {
        add(results[i]);
      }

      if (!errors.length) {
        callback(null, source);
      } else {
        fields = convertFieldsError(errors);
        callback(errors, fields);
      }
    }

    if (options.messages) {
      var messages$1 = this.messages();

      if (messages$1 === messages) {
        messages$1 = newMessages();
      }

      deepMerge(messages$1, options.messages);
      options.messages = messages$1;
    } else {
      options.messages = this.messages();
    }

    var series = {};
    var keys = options.keys || Object.keys(this.rules);
    keys.forEach(function (z) {
      var arr = _this2.rules[z];
      var value = source[z];
      arr.forEach(function (r) {
        var rule = r;

        if (typeof rule.transform === 'function') {
          if (source === source_) {
            source = _extends({}, source);
          }

          value = source[z] = rule.transform(value);
        }

        if (typeof rule === 'function') {
          rule = {
            validator: rule
          };
        } else {
          rule = _extends({}, rule);
        } // Fill validator. Skip if nothing need to validate


        rule.validator = _this2.getValidationMethod(rule);

        if (!rule.validator) {
          return;
        }

        rule.field = z;
        rule.fullField = rule.fullField || z;
        rule.type = _this2.getType(rule);
        series[z] = series[z] || [];
        series[z].push({
          rule: rule,
          value: value,
          source: source,
          field: z
        });
      });
    });
    var errorFields = {};
    return asyncMap(series, options, function (data, doIt) {
      var rule = data.rule;
      var deep = (rule.type === 'object' || rule.type === 'array') && (typeof rule.fields === 'object' || typeof rule.defaultField === 'object');
      deep = deep && (rule.required || !rule.required && data.value);
      rule.field = data.field;

      function addFullField(key, schema) {
        return _extends({}, schema, {
          fullField: rule.fullField + "." + key,
          fullFields: rule.fullFields ? [].concat(rule.fullFields, [key]) : [key]
        });
      }

      function cb(e) {
        if (e === void 0) {
          e = [];
        }

        var errorList = Array.isArray(e) ? e : [e];

        if (!options.suppressWarning && errorList.length) {
          Schema.warning('async-validator:', errorList);
        }

        if (errorList.length && rule.message !== undefined) {
          errorList = [].concat(rule.message);
        } // Fill error info


        var filledErrors = errorList.map(complementError(rule, source));

        if (options.first && filledErrors.length) {
          errorFields[rule.field] = 1;
          return doIt(filledErrors);
        }

        if (!deep) {
          doIt(filledErrors);
        } else {
          // if rule is required but the target object
          // does not exist fail at the rule level and don't
          // go deeper
          if (rule.required && !data.value) {
            if (rule.message !== undefined) {
              filledErrors = [].concat(rule.message).map(complementError(rule, source));
            } else if (options.error) {
              filledErrors = [options.error(rule, format(options.messages.required, rule.field))];
            }

            return doIt(filledErrors);
          }

          var fieldsSchema = {};

          if (rule.defaultField) {
            Object.keys(data.value).map(function (key) {
              fieldsSchema[key] = rule.defaultField;
            });
          }

          fieldsSchema = _extends({}, fieldsSchema, data.rule.fields);
          var paredFieldsSchema = {};
          Object.keys(fieldsSchema).forEach(function (field) {
            var fieldSchema = fieldsSchema[field];
            var fieldSchemaList = Array.isArray(fieldSchema) ? fieldSchema : [fieldSchema];
            paredFieldsSchema[field] = fieldSchemaList.map(addFullField.bind(null, field));
          });
          var schema = new Schema(paredFieldsSchema);
          schema.messages(options.messages);

          if (data.rule.options) {
            data.rule.options.messages = options.messages;
            data.rule.options.error = options.error;
          }

          schema.validate(data.value, data.rule.options || options, function (errs) {
            var finalErrors = [];

            if (filledErrors && filledErrors.length) {
              finalErrors.push.apply(finalErrors, filledErrors);
            }

            if (errs && errs.length) {
              finalErrors.push.apply(finalErrors, errs);
            }

            doIt(finalErrors.length ? finalErrors : null);
          });
        }
      }

      var res;

      if (rule.asyncValidator) {
        res = rule.asyncValidator(rule, data.value, cb, data.source, options);
      } else if (rule.validator) {
        res = rule.validator(rule, data.value, cb, data.source, options);

        if (res === true) {
          cb();
        } else if (res === false) {
          cb(typeof rule.message === 'function' ? rule.message(rule.fullField || rule.field) : rule.message || (rule.fullField || rule.field) + " fails");
        } else if (res instanceof Array) {
          cb(res);
        } else if (res instanceof Error) {
          cb(res.message);
        }
      }

      if (res && res.then) {
        res.then(function () {
          return cb();
        }, function (e) {
          return cb(e);
        });
      }
    }, function (results) {
      complete(results);
    }, source);
  };

  _proto.getType = function getType(rule) {
    if (rule.type === undefined && rule.pattern instanceof RegExp) {
      rule.type = 'pattern';
    }

    if (typeof rule.validator !== 'function' && rule.type && !validators.hasOwnProperty(rule.type)) {
      throw new Error(format('Unknown rule type %s', rule.type));
    }

    return rule.type || 'string';
  };

  _proto.getValidationMethod = function getValidationMethod(rule) {
    if (typeof rule.validator === 'function') {
      return rule.validator;
    }

    var keys = Object.keys(rule);
    var messageIndex = keys.indexOf('message');

    if (messageIndex !== -1) {
      keys.splice(messageIndex, 1);
    }

    if (keys.length === 1 && keys[0] === 'required') {
      return validators.required;
    }

    return validators[this.getType(rule)] || undefined;
  };

  return Schema;
}();

Schema.register = function register(type, validator) {
  if (typeof validator !== 'function') {
    throw new Error('Cannot register a validator by type, validator is not a function');
  }

  validators[type] = validator;
};

Schema.warning = warning;
Schema.messages = messages;
Schema.validators = validators;

const FormItem = defineComponent({
  name: 'FormItem',
  props: FormItemProp,

  setup(props, {
    slots
  }) {
    const error = ref('');
    const isError = ref(false);
    const formProp = inject(key);
    const emitter$1 = mitt();
    const isRequired = ref(false); // 遍历判断是否 required 添加样式

    for (const rule in props.rules) {
      var _props$rules$rule;

      if ((_props$rules$rule = props.rules[rule]) !== null && _props$rules$rule !== void 0 && _props$rules$rule.required) {
        var _props$rules;

        isRequired.value = !!((_props$rules = props.rules) !== null && _props$rules !== void 0 && _props$rules.required);
        break;
      }
    } // debugger;
    // 通过 async-validator 进行效验
    // 并将该方法监听 通过 emitter


    const validate = () => {
      if ((formProp === null || formProp === void 0 ? void 0 : formProp.rules) === undefined) {
        return Promise.resolve({
          result: true
        });
      } // 获取当前 item 的 prop


      const prop = props.prop; // 获取当前 item 的 rule

      const rule = formProp.rules[prop]; // 如果没有 rule 的话 直接返回成功

      if (!rule) {
        return Promise.resolve({
          result: true
        });
      }

      const value = formProp.model[prop]; // 通过第三方注入

      const schema = new Schema({
        [prop]: rule
      }); // 通过第三方进行验证

      return schema.validate({
        [prop]: value
      }, err => {
        if (err) {
          isError.value = true;
          error.value = rule[0].message || '效验错误';
        } else {
          isError.value = false;
          error.value = '';
        }
      });
    };

    const params = {
      validate
    }; // 暴露方法 及 validaterItem

    useExpose({
      params
    });
    onMounted(() => {
      if (props.prop) {
        // 监听 validate 事件
        // 在 input 组件中触发
        emitter$1.on('validate', () => {
          validate();
        }); // 发送 formItem 事件
        // form 监听该事件
        // 完成进入数组

        emitter.emit('formItem', params);
      }
    });
    const formItemProvide = reactive({ ...toRefs(props),
      emitter: emitter$1,
      validate
    }); // 通过 provide 注入 当前组件的 props 及方法

    provide('formItemProvide', formItemProvide); // label 属性

    const renderLabelAttr = () => {
      const attr = {};
      if (props.prop) attr.for = props.prop;
      return attr;
    };

    return () => createVNode(Fragment, null, [createVNode("div", {
      "class": ['form-item mb-6 flex', isError.value && itemStyles['is-error']]
    }, [createVNode("label", mergeProps(renderLabelAttr(), {
      "class": ['form-item__label flex text-gray-500 text-sm mb-1 justify-end items-center pr-3 dark:text-gray-300', (props.required || isRequired) && itemStyles['is-required']],
      "style": {
        width: props.labelWidth || '60px'
      }
    }), [props.label]), createVNode("div", {
      "class": 'form-item__inner flex-1 relative transition-all duration-300'
    }, [renderSlot(slots, 'default'), createVNode(Transition, {
      "enterFromClass": itemStyles['fade-enter'],
      "leaveToClass": itemStyles['fade-enter'],
      "enterActiveClass": itemStyles['fade-active'],
      "leaveActiveClass": itemStyles['fade-active']
    }, {
      default: () => [isError.value ? createVNode("span", {
        "class": 'form-item__error absolute text-xs pt-0.5 text-themeerrorcolor-400'
      }, [error.value]) : null]
    })])])]);
  }

});

var footer = defineComponent({
  name: 'Footer',

  render() {
    return createVNode(Fragment, null, [createVNode("footer", {
      "class": 'fixed shadow-top-md left-0 right-0 bottom-0 h-16 bg-white dark:shadow-themebgcolor-700 dark:bg-themebgcolor-900'
    }, null)]);
  }

});

const stopDefault = e => {
  e.stopPropagation();
  e.preventDefault();
};

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

var components = /*#__PURE__*/Object.freeze({
	__proto__: null,
	LAside: aside,
	LButton: LButton,
	LDialog: dialog,
	LIcon: LIcon,
	LList: index,
	LLoading: loading,
	LMasker: LMasker,
	LNavbar: Navbar,
	LSidebar: Sidebar,
	LSkeleton: LSkeleton,
	LInput: input,
	LForm: Form,
	LFormItem: FormItem,
	LFooter: footer,
	LScroll: scroll
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
  prefix: 'L',
  components: Object.keys(components).map(key => components[key])
});

export { aside as LAside, LButton, dialog as LDialog, footer as LFooter, Form as LForm, FormItem as LFormItem, LIcon, input as LInput, index as LList, loading as LLoading, LMasker, Navbar as LNavbar, scroll as LScroll, Sidebar as LSidebar, LSkeleton, install as default };
