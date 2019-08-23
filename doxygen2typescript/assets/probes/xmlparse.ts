import { writeFileSync } from 'fs'
import { JSDOM, VirtualConsole } from "jsdom"
import { serial } from 'misc-utils-of-mine-generic'

const vc = new VirtualConsole()
vc.sendTo(console)

const { window } = new JSDOM("", { virtualConsole: vc })

const { DOMParser, Node } = window

const parser = new DOMParser()
const doc = parser.parseFromString(
  `
<detaileddescription>
  <para>It represents a 4x4 homogeneous transformation matrix <formula id="0">$T$</formula>
  </para>
  <para>
    <formula id="1">[T = \\begin{bmatrix} R &amp; t\\ 0 &amp; 1\\ \\end{bmatrix} ]</formula>
  </para>
  <para>where <formula id="2">$R$</formula> is a 3x3 rotation matrix and <formula id="3">$t$</formula> is a 3x1
    translation vector.</para>
  <para>You can specify <formula id="2">$R$</formula> either by a 3x3 rotation matrix or by a 3x1 rotation vector,
    which is converted to a 3x3 rotation matrix by the Rodrigues formula.</para>
  <para>To construct a matrix <formula id="0">$T$</formula> representing first rotation around the axis <formula id="4">$r$</formula>
    with rotation angle <formula id="5">$|r|$</formula> in radian (right hand rule) and then translation by the vector
    <formula id="3">$t$</formula>, you can use</para>
  <para>
    <programlisting>
      <codeline>
        <highlight class="normal">cv::Vec3f<sp />r,<sp />t;</highlight>
      </codeline>
      <codeline>
        <highlight class="normal">cv::Affine3f<sp />T(r,<sp />t);</highlight>
      </codeline>
    </programlisting>
  </para>
  <para>If you already have the rotation matrix <formula id="2">$R$</formula>, then you can use</para>
  <para>
    <programlisting>
      <codeline>
        <highlight class="normal">cv::Matx33f<sp />R;</highlight>
      </codeline>
      <codeline>
        <highlight class="normal">cv::Affine3f<sp />T(R,<sp />t);</highlight></codeline>
    </programlisting>
  </para>
  <para>To extract the rotation matrix <formula id="2">$R$</formula> from <formula id="0">$T$</formula>, use</para>
  <para>
    <programlisting>
      <codeline>
        <highlight class="normal">cv::Matx33f<sp />R<sp />=<sp />T.rotation();</highlight>
      </codeline>
    </programlisting>
  </para>
  <para>To extract the translation vector <formula id="3">$t$</formula> from <formula id="0">$T$</formula>, use</para>
  <para>
    <programlisting>
      <codeline>
        <highlight class="normal">cv::Vec3f<sp />t<sp />=<sp />T.translation();</highlight>
      </codeline>
    </programlisting>
  </para>
  <para>To extract the rotation vector <formula id="4">$r$</formula> from <formula id="0">$T$</formula>, use</para>
  <para>
    <programlisting>
      <codeline>
        <highlight class="normal">cv::Vec3f<sp />r<sp />=<sp />T.rvec();</highlight>
      </codeline>
    </programlisting>
  </para>
  <para>Note that since the mapping from rotation vectors to rotation matrices is many to one. The returned rotation
    vector is not necessarily the one you used before to set the matrix.</para>
  <para>If you have two transformations <formula id="6">$T = T_1 * T_2$</formula>, use</para>
  <para>
    <programlisting>
      <codeline>
        <highlight class="normal">cv::Affine3f<sp />T,<sp />T1,<sp />T2;</highlight>
      </codeline>
      <codeline>
        <highlight class="normal">T<sp />=<sp />T2.concatenate(T1);</highlight>
      </codeline>
    </programlisting>
  </para>
  <para>To get the inverse transform of <formula id="0">$T$</formula>, use</para>
  <para>
    <programlisting>
      <codeline>
        <highlight class="normal">cv::Affine3f<sp />T,<sp />T_inv;</highlight>
      </codeline>
      <codeline>
        <highlight class="normal">T_inv<sp />=<sp />T.inv();</highlight>
      </codeline>
    </programlisting>
  </para>
</detaileddescription>
`,
  "text/xml")
// const de = doc.documentElement.childNodes;

// function check() {
//   assert("content", de.textContent, "");
//   assert("length", de.childNodes.length, 2);
//   assertCDATA(de.childNodes[0], "");
//   assertComment(de.childNodes[1], "");
// }

// check();

var MathJax = require("mathjax-node")

// ?config=TeX-MML-AM_CHTML

// import MathJax from 'mathjax' 
// node_modules/mathjax/MathJax.js
const document = doc.documentElement
async function f() {
  // MathJax.config(
  // {
  // MathJax: {
  // jax: 'svg',
  // singleDollars:true,
  // tex2jax: { inlineMath: [['$','$'],['\\(','\\)']] },
  // extensions: 'TeX/AMSmath',
  // TeX: {
  //  tex2jax: { inlineMath: [['$','$'],['\\(','\\)']] },
  //     Macros: {
  //         matTT: [ "\\[ \\left|\\begin{array}{ccc} #1 & #2 & #3\\\\ #4 & #5 & #6\\\\ #7 & #8 & #9 \\end{array}\\right| \\]", 9],
  //         fork: ["\\left\\{ \\begin{array}{l l} #1 & \\mbox{#2}\\\\ #3 & \\mbox{#4}\\\\ \\end{array} \\right.", 4],
  //         forkthree: ["\\left\\{ \\begin{array}{l l} #1 & \\mbox{#2}\\\\ #3 & \\mbox{#4}\\\\ #5 & \\mbox{#6}\\\\ \\end{array} \\right.", 6],
  //         forkfour: ["\\left\\{ \\begin{array}{l l} #1 & \\mbox{#2}\\\\ #3 & \\mbox{#4}\\\\ #5 & \\mbox{#6}\\\\ #7 & \\mbox{#8}\\\\ \\end{array} \\right.", 8],
  //         vecthree: ["\\begin{bmatrix} #1\\\\ #2\\\\ #3 \\end{bmatrix}", 3],
  //         vecthreethree: ["\\begin{bmatrix} #1 & #2 & #3\\\\ #4 & #5 & #6\\\\ #7 & #8 & #9 \\end{bmatrix}", 9],
  //         hdotsfor: ["\\dots", 1],
  //         mathbbm: ["\\mathbb{#1}", 1],
  //         bordermatrix: ["\\matrix{#1}", 1]
  //     },
  // },
  // },
  //   tex2jax: { inlineMath: [['$','$'],['\\(','\\)']] },

  // }
  // );
  // node_modules/mathjax/extensions/TeX/AMSmath.js

  await MathJax.config({
    MathJax: {
      jax: 'svg',
    }
  })
  await MathJax.start()
  // var yourMath = 'E = mc^2';


  await serial(Array.from(document.querySelectorAll('formula')).map(f => async () => {
    // document.querySelectorAll('formula').forEach(async f=>{
    try {
      var r = await MathJax.typeset({
        //   // jax: 'HTML-CSS',
        // jax: ["input/TeX","input/MathML","input/AsciiMath","output/CommonHTML"],
        // tex2jax: { inlineMath: [['$','$'],['\\(','\\)']] },

        // extensions: ["tex2jax.js","mml2jax.js","asciimath2jax.js","MathMenu.js","MathZoom.js","AssistiveMML.js", "a11y/accessibility-menu.js"],
        //   // TeX: {
        //   //   extensions: ["AMSmath.js","AMSsymbols.js","noErrors.js","noUndefined.js"]
        // },

        math: unescapeHtmlEntitiesInBrowser(f.innerHTML).trim().replace(/^\$/, '').replace(/\$$/g, ''),//.replace(/\<sp\s*\/\>/g, ' '),
        // format: 'inline-TeX',
        // format: "MathML", // or "inline-TeX", "MathML"
        svg: true,      // or svg:true, or html:true
      })

      // f.outerHTML=`<script type="math/tex; mode=display" >${f.innerHTML}</script>`
      // console.log(r);
      // f.replaceWith(r)
      f.outerHTML = r.svg
    } catch (error) {
      console.error(f.innerHTML, error);

    }
    // })
  }))
  // document.querySelectorAll('para').forEach(f=>replace(f, 'p', f.innerHTML))//  (`<p>${f.innerHTML}</p>`))
  document.querySelectorAll('detaileddescription').forEach(f => f.outerHTML = `<article>w${f.innerHTML}</article>`)
  document.querySelectorAll('para').forEach(f => { f.outerHTML = `<p>${f.innerHTML}</p>` })//  (`<p>${f.innerHTML}</p>`))
  document.querySelectorAll('programlisting').forEach(f => f.outerHTML = `<pre>${f.innerHTML}</pre>`)
  document.querySelectorAll('highlight').forEach(f => f.outerHTML = `${f.innerHTML}`)
  document.querySelectorAll('codeline').forEach(f => f.outerHTML = `${f.innerHTML}`)
  document.querySelectorAll('sp').forEach(f => f.outerHTML = `${f.innerHTML}`)


  function unescapeHtmlEntitiesInBrowser(input: string) {
    var doc = new DOMParser().parseFromString(input, "text/html")
    return doc.documentElement.textContent
  }
  writeFileSync('tmp.html', `
<html>
<head>
</head>
<body>
${document.outerHTML}
</body>
</html>
`)
}
function replace(el: Element, t: string, c: string) {
  var e = doc.createElement(t)
  e.innerHTML = c
  el.replaceWith(e)
  return e

}
f()
