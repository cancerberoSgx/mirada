// interface Ref {
//   $: {
//     refid: string;
//     kindref: string;
//   }
//   _: string;
// }
// interface Para {
//   _: string;
//   $$: {
//     computeroutput: ComputerOutput[];
//     ref: Ref[];
//     emphasis: string[];
//   }
// }

// interface Listitem {
//   $$: {
//     para: Para[];
//   }
// }


// interface Itemizedlist {
//   $$: { listitem: Listitem[] }
// }


// interface buildDescription {
//   $$: { itemizedlist: Itemizedlist[]; }
// }

// interface ComputerOutput {
//   $$: {
//     "ref": Ref[];
//   }
// }
