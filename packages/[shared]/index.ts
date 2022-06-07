import { $T } from '@/hooks/useRouter';

export const go = (e: MouseEvent, url: string, params?: { [key: string]: any }) => {
	e.stopPropagation();
	e.preventDefault();
	$T.push(url, params);
};
