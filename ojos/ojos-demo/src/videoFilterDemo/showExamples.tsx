import * as React from 'react'
import { examples } from './examples'
import { loadUrl } from './urlState';

export function  showExamples(){
document.querySelector<HTMLElement>('.exampleListContainer')!.classList.add('visible')
}

function hideExamples(): void {
  return document.querySelector<HTMLElement>('.exampleListContainer')!.classList.remove('visible');
}

export function Examples() {
  return <div className="exampleListContainer">
    <button onClick={hideExamples}>Hide</button>
    <h3>Interesting Operation sequences </h3>
    <p>Click on the images to open the right settings and experience the the filter yourself. (I liked this - if you find some interesting sequence please share! :) )</p>
    <ol className="exampleList">{examples().map(e => <li>
  <ul>{e.images.map(i => 
  <li>
    <a href={`${window.location.href}/#${e.hash}`} onClick={ev=>{hideExamples(); loadUrl(e.hash)}}>
  <img src={i} />
  </a>
  </li>)}
  </ul>
  </li>)}
  </ol>
    <button onClick={hideExamples}>Hide</button>
  </div>;
}

