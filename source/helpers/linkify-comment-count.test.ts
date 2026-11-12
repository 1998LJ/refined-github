import {$, $$, $$optional} from 'select-dom';
import {assert, test} from 'vitest';

import linkifyCommentCount from './linkify-comment-count.js';

function createCommentCount(): HTMLElement {
	const item = document.createElement('div');
	const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	icon.classList.add('octicon', 'octicon-comment');
	item.append(icon, document.createTextNode(' 3'));
	return item;
}

test('linkify a comment count only once when observed again', () => {
	const item = createCommentCount();
	const href = 'https://github.com/user/repo/pull/123#issue-comment-box';

	linkifyCommentCount(item, href);
	linkifyCommentCount(item, href);

	assert.lengthOf($$('a', item), 1);
	assert.isEmpty($$optional('a a', item));
	assert.equal($('a.Link--muted.d-flex.gap-1', item).href, href);
});

test('update the existing comment link when the conversation URL changes', () => {
	const item = createCommentCount();
	const firstHref = 'https://github.com/user/repo/pull/123#issue-comment-box';
	const nextHref = 'https://github.com/user/repo/issues/456#react-issue-comment-composer';

	linkifyCommentCount(item, firstHref);
	linkifyCommentCount(item, nextHref);

	assert.lengthOf($$('a', item), 1);
	assert.equal($('a.Link--muted.d-flex.gap-1', item).href, nextHref);
});
