import * as d3 from "d3";
import $ from "jquery";


var current_selection_name = $("#selection_name_box").val(),
    color_scheme = d3.scaleOrdinal(d3.schemeCategory10),
    current_selection_id;

export function update_selection_names(id, skip_rebuild, tree, selection_set) {
  skip_rebuild = skip_rebuild || false;
  id = id || 0;
  current_selection_name = selection_set[id];
  current_selection_id = id;

  if (!skip_rebuild) {

    d3.selectAll(".selection_set").remove();
    d3.select("#selection_name_dropdown")
      .selectAll(".selection_set")
      .data(selection_set)
      .enter()
      .append("label") // use label so clicking text toggles checkbox
      .attr("class", "selection_set dropdown-item")
      .style("display", "block") // ensure each on new line
      .style("color", (d, i) => color_scheme(i))
      .each(function(d, i) {
          const label = d3.select(this);
          // append checkbox
          label.append("input")
          .attr("type", "checkbox")
          .attr("value", d)
          .style("margin-right", "6px")
          .on("change", function(event) {
              const checked = event.target.checked;
            
              const node = getNodesWithKey(tree.getRootNode(), d);
              tree.display.toggleCollapse(node).update();
              selection_set.forEach((value) => {
                if (d != value) {
                    let node = getNodesWithKey(tree.getRootNode(), value)
                    if (node.depth > 1) {tree.display.toggleCollapse(node)};
                    tree.display.update();
                    toggleCladeLabel(tree, node, selection_set)  
                    if (node.depth > 1) {tree.display.toggleCollapse(node)};
                    tree.display.update();
                    toggleCladeLabel(tree, node, selection_set)  
                }
              });
              redrawClades(tree, selection_set)
              toggleCladeLabel(tree, node, selection_set)  
          });
          label.append("span").text(d);
      });
  }
  
  d3.select("#selection_name_box")
      .style("color", color_scheme(id))
      .property("value", current_selection_name);

  selection_set.forEach((value, idx) => {
      tree.display.selectionLabel(value); // same as id in lodash version
      tree.display.update();
  });

  tree.display.selectionLabel(selection_set[id], null);
  tree.display.update();
}


function redrawClades(tree, selection_set) {
  let enclosure = d3.select(tree.display.container).select("." + "phylotree-container");

  // Select all clades
  let clades = enclosure.selectAll(".clade");


  clades.each(function(d) {
    const path = d3.select(this);
    const bbox = this.getBBox();

    // Remove existing label
    enclosure.selectAll(`.clade-label-${d.id}`).remove();

    // Find selection matches
    const matches = selection_set.filter(key => key in d);

    // Add the label at the updated position
    enclosure.append("text")
      .attr("class", `clade-label clade-label-${d.id}`)
      .text(matches[0] || "")
      .attr("x", bbox.x + bbox.width + 5)
      .attr("y", bbox.y + bbox.height / 2)
      .attr("alignment-baseline", "middle")
      .style("font-size", "12px")
      .style("font-weight", "bold");
  });
}

export function isLeafNode(node) {

  return !("children" in node);
}
/**
 * Select all descendents of a given node, with options for selecting
 * terminal/internal nodes.
 *
 * @param {Node} node The node whose descendents should be selected.
 * @param {Boolean} terminal Whether to include terminal nodes.
 * @param {Boolean} internal Whther to include internal nodes.
 * @returns {Array} An array of selected nodes.
 */
export function selectAllAttributes(node, searchTerm, type) {

  let selection = [];
    
  function sel(d) {
    if (isLeafNode(d)) {
        if (d.data[type] == searchTerm) {
        selection.push(d);
        }
      
    } else {
        if (d.data[type] == searchTerm) {
        selection.push(d);
        }
        d.children.forEach(sel);
    }
  }

  sel(node);
  return selection;
}

export function getNodesWithKey(root, key) {
  return root.descendants().find(node => {
    if (!node.children || node.children.length === 0) return false; // skip leaves
    return node.children.every(child => key in child);
  });
}

export function toggleCladeLabel(tree, node, selection_set) {
    
    // Select the container
    let enclosure = d3.select(tree.display.container).select("." + "phylotree-container");
    // Find the path corresponding to this node
    // Select the collapsed clade path for this node
    let cladePathSelection = enclosure.selectAll(".clade")
        .filter(d => d && d.id === node.id);

    // Get the actual DOM element
    let cladePath;
    cladePathSelection.each(function(d) { cladePath = this; }); // 'this' is the DOM element

    if (node.collapsed) {
    // Get bounding box of the clade path
    const bbox = cladePath.getBBox();

    // Find matching key in selection_set
    const matches = selection_set.filter(key => key in node);

    // Color the clade path (similar to node_colorizer)
    if (matches.length > 0) {
        const matchIndex = selection_set.indexOf(matches[0]);
        d3.select(cladePath)
            .style("fill", color_scheme(matchIndex))
            .style("stroke", color_scheme(matchIndex))
            .style("opacity", 0.4); // optional transparency so tree is visible
    }

    // Append label
    enclosure.append("text")
        .attr("class", `clade-label clade-label-${node.id}`)
        .text(`${matches[0]}`)
        .attr("x", bbox.x + bbox.width + 5)
        .attr("y", bbox.y + bbox.height / 2)
        .attr("alignment-baseline", "middle")
        .style("font-size", "12px")
        .style("font-weight", "bold");
    } else {

        // Remove label + reset clade styling
        enclosure.selectAll(`.clade-label-${node.id}`).remove();
        d3.select(cladePath).style("fill", null).style("stroke", null);
    }
}
