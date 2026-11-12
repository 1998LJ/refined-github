import {wrapAll} from './dom-utils.js';

export default function linkifyCommentCount(item: HTMLElement, href: string): void {
	const existingLink = item.firstElementChild;
	if (existingLink instanceof HTMLAnchorElement && existingLink.matches('a.Link--muted.d-flex.gap-1')) {
		existingLink.href = href;
		return;
	}

	const link = document.createElement('a');
	link.href = href;
	link.className = 'Link--muted d-flex gap-1';
	wrapAll(link, ...item.childNodes);
}
