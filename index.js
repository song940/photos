import { ready, querySelector as $ } from 'https://lsong.org/scripts/dom.js';
import { h, render, useState, useEffect } from 'https://unpkg.com/htm/preact/standalone.module.js';

const Post = ({ img }) => {
  return h('div', { className: "post" }, [
    h('header', null, "@song940 2020-02-22 19:38:40"),
    h('img', { src: img }),
    h('footer', null, [
      h('a', { href: img }, "Link")
    ]),
  ]);
};

const App = () => {
  const PAGE_SIZE = 10;
  const [offset, setOffset] = useState(1);
  const [images, setImages] = useState([]);
  useEffect(async () => {
    const response = await fetch('./data/unsplash.json');
    const images = await response.json();
    setImages(images);
  }, []);
  const loadMore = () => {
    setOffset(offset + 1);
  };
  return h('div', {}, [
    h('ul', { className: "posts" },
      images.slice(0, offset * PAGE_SIZE).map(img => h('li', null, h(Post, { img })))
    ),
    h('div', { className: "more", onClick: loadMore }, "load more")
  ]);
};


ready(() => {
  const app = document.getElementById('app');
  render(h(App), app);
});