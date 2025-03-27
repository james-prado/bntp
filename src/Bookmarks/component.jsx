import './component.css';
import { filterBookmarks } from './model';
import { Drag, reorderBookmarks } from './viewmodel';
import React, { useContext, useState } from 'react';
import { moveBookmark, useBookmarkFolders, useFolderCollapse } from './repository';
import BookmarkEditorComponent from '../BookmarkEditor/component';
import { FaviconContext } from '../infrastructure/favicon';
import LinkComponent from '../Link/component';
import ShortcutKeyComponent from '../ShortcutKey/component';
import { useShortcutMap } from '../ShortcutKey/repository';
import { useToggles } from '../Toggles/repository';

const BookmarksComponent = ({ search }) => {
  const bookmarkFolders = useBookmarkFolders();
  const [shortcutMap] = useShortcutMap();
  return (<>
    <BookmarkFoldersComponent bookmarkFolders={bookmarkFolders} shortcutMap={shortcutMap} search={search} />
    <ShortcutKeyComponent bookmarkFolders={bookmarkFolders} shortcutMap={shortcutMap} />
  </>);
};
export default BookmarksComponent;
const BookmarkFoldersComponent = ({ bookmarkFolders, shortcutMap, search }) => {
  const [toggles] = useToggles();
  const [folderCollapse, setFolderCollapse] = useFolderCollapse();
  const [drag, setDrag] = useState();
  return (<div className="BookmarkFolders">
    {bookmarkFolders.map((f, i) => (<BookmarkFolderIndent key={i} depth={toggles.indent ? f.depth : 0}>
      <BookmarkFolderCollapse folder={f} folderCollapse={folderCollapse} setFolderCollapse={setFolderCollapse}>
        <BookmarkList folder={f} shortcutMap={shortcutMap} search={search} drag={drag} setDrag={setDrag} />
      </BookmarkFolderCollapse>
    </BookmarkFolderIndent>))}
  </div>);
};
const BookmarkFolderIndent = ({ depth, children }) => (<div className="BookmarkFolder__Indent" style={{ '--depth': depth }}>
  {children}
</div>);
const BookmarkFolderCollapse = ({ folder, folderCollapse, setFolderCollapse, children, }) => {
  if (folderCollapse.isCollapsed(folder.id)) {
    return (<section className="BookmarkFolder">
      <div className="BookmarkFolder__Heading">
        <a href="#Expand" onClick={(e) => {
          setFolderCollapse(folderCollapse.expand(folder.id));
          e.preventDefault();
        }}>
          {folder.title}
        </a>
      </div>
    </section>);
  }
  return (<section className="BookmarkFolder">
    <div className="BookmarkFolder__Heading">
      <a href="#Collapse" onClick={(e) => {
        setFolderCollapse(folderCollapse.collapse(folder.id));
        e.preventDefault();
      }}>
        {folder.title}
      </a>
    </div>
    {children}
  </section>);
};
const BookmarkList = ({ folder, shortcutMap, search, drag, setDrag }) => {
  const bookmarks = reorderBookmarks(drag, folder.id, filterBookmarks(folder.bookmarks, search));
  return (<div class="BookmarkList">
    {bookmarks.map((b, index) => (<BookmarkDragDrop key={b.id} bookmark={b} position={{ folderID: folder.id, index }} drag={drag} setDrag={setDrag}>
      <BookmarkComponent bookmark={b} shortcutMap={shortcutMap} dragActive={drag ? true : undefined} />
    </BookmarkDragDrop>))}
  </div>);
};
const classNameOfMap = (classNameMap) => Object.entries(classNameMap)
  .filter(([, enabled]) => enabled === true)
  .map(([className]) => className)
  .join(' ');
const BookmarkDragDrop = ({ bookmark, position, drag, setDrag, children }) => {
  return (<div className={classNameOfMap({
    Bookmark__DragDrop__From: bookmark.dragFrom,
    Bookmark__DragDrop__To: bookmark.dragTo,
  })} data-bookmark-drag-state={bookmark.state} onDragStart={(e) => {
    setDrag(Drag.start(bookmark, position));
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', bookmark.url);
  }} onDragOver={(e) => {
    if (drag) {
      e.preventDefault();
    }
  }} onDragEnter={(e) => {
    if (drag) {
      e.preventDefault();
      setDrag(drag.enterTo(position));
    }
  }} onDragLeave={(e) => {
    // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/relatedTarget
    const exitedFrom = e.target;
    const enteredTo = e.relatedTarget;
    if (drag &&
      exitedFrom instanceof HTMLElement &&
      exitedFrom.classList.contains('BookmarkButton') &&
      enteredTo instanceof HTMLElement &&
      enteredTo.classList.contains('BookmarkFolder')) {
      setDrag(drag.leave());
    }
  }} onDragEnd={() => {
    setDrag(undefined);
  }} onDrop={(e) => {
    e.preventDefault();
    if (drag) {
      moveBookmark(drag.bookmark, drag.calculateDestination()).catch(console.error);
      setDrag(undefined);
    }
  }}>
    {children}
  </div>);
};
const BookmarkComponent = ({ bookmark, shortcutMap, dragActive }) => {
  const [openBookmarkEditor, setOpenBookmarkEditor] = useState(false);
  const favicon = useContext(FaviconContext);
  const shortcutKey = shortcutMap.getByBookmarkID(bookmark.id);
  return (<div className="Bookmark">
    <LinkComponent href={bookmark.url}>
      <div className="BookmarkButton" data-drag-active={dragActive} draggable>
        <div className="BookmarkButton__Title">{bookmark.title}</div>
        <img className="BookmarkButton__Icon" alt="" src={favicon.getImageUrl(bookmark.url)} />
        {shortcutKey ? <div className="BookmarkButton__Badge">{shortcutKey}</div> : null}
      </div>
    </LinkComponent>
    <a href="#Edit" className="BookmarkEditButton" data-drag-active={dragActive} onClick={(e) => {
      setOpenBookmarkEditor(true);
      e.preventDefault();
    }}>
      &hellip;
    </a>
    <BookmarkEditorComponent open={openBookmarkEditor} bookmark={bookmark} shortcutKey={shortcutKey} onRequestClose={() => setOpenBookmarkEditor(false)} />
  </div>);
};
