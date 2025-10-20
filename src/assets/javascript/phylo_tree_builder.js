import * as phylotree from "phylotree";
import { newick } from "../../components/phlogeny_tree/phylogenyTaxonium";
import * as d3 from "d3";

export function assignAttributes(d, attributes) {
  if (d != undefined) {
    d.host = attributes.host;
    d.country = attributes.country;
    d.minor_clade = attributes.minor_clade;
  }
}

function findNodeByName(node, targetName) {
  if (node.name === targetName) return node;

  if (node.children) {
    for (const child of node.children) {
      const result = findNodeByName(child, targetName);
      if (result) return result;
    }
  }
  return null;
}

// ✅ Make async so we can wait for d3.csv
async function addAnnotationsToTree(tree) {
  const data = await d3.tsv("/metadata.tsv");

  data.forEach(row => {
    const attr = { 
      host: row.host, 
      country: row.country, 
      minor_clade: row.minor_clade 
    };
    assignAttributes(findNodeByName(tree, row["primary_accession"]), attr);
  });

  return tree; // return only after annotations are added
}

const downloadJson = (data, filename = "myTree.json") => {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
};

export async function main() {
    const testJson = phylotree.newickParser(newick);
    console.log("Parsed tree:", testJson);

    // ✅ Wait for annotations to finish before continuing
    let final_tree = await addAnnotationsToTree(testJson.json);

    console.log("Annotated tree:", final_tree);
    let tree = new phylotree.phylotree(final_tree);
    console.log(tree.getNodeByName('AY352474'))
    // Usage
    downloadJson(final_tree, "myTree.json");

}
