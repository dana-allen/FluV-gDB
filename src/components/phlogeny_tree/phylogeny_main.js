import * as d3 from "d3";
import $ from "jquery";
import * as phylotree from "phylotree";
import { update_selection_names, selectAllAttributes, getNodesWithKey, toggleCladeLabel } from "./phylogenyHelper";
import myTree from "./myTree.json";


var tree,
    selection_set = [],
    current_selection_id = 0,
    color_scheme = d3.scaleOrdinal(d3.schemeCategory10);

export function node_colorizer(element, data) {
    try {
        var count_class = 0;

        selection_set.forEach(function(d, i) {
        if (data[d]) {
            count_class++;
            element.style(
            "fill",
            color_scheme(i),
            i == current_selection_id ? "important" : null
            );
        }
        });

        if (count_class > 1) {
        } else {
        if (count_class == 0) {
            element.style("fill", null);
        }
        }
    } catch (e) {}
}

export function edge_colorizer(element, data) {

    try {
        var count_class = 0;

        selection_set.forEach(function(d, i) {
        if (data[d]) {
            count_class++;
            element.style(
            "stroke",
            color_scheme(i),
            i == current_selection_id ? "important" : null
            );
        }
        });

        if (count_class > 1) {
        element.classed("branch-multiple", true);
        } else if (count_class == 0) {
        element.style("stroke", null).classed("branch-multiple", false);
        }
    } catch (e) {}
}

export function reset() {

    createTree()

}

export function highlightTipPath(nodeName) {

    let selected_nodes = tree.display.getSelection()
    tree.display.modifySelection(selected_nodes);
    const node = tree.getNodeByName(nodeName);
    const matches = selection_set.filter(key => key in node);
    if (node) tree.display.modifySelection(tree.pathToRoot(node), "tag", false, true, "true");
    d3.select(`[data-node-name="${node.data.name}"]`)
            .classed("node-tagged", true);

    const node2 = getNodesWithKey(tree.getRootNode(), matches[0]);
    tree.display.toggleCollapse(node2).update();
    toggleCladeLabel(tree, node2, selection_set)  
    selection_set.forEach((value) => {
                        if (matches[0] != value) {
                            let node = getNodesWithKey(tree.getRootNode(), value)
                            if (node.depth > 1) {tree.display.toggleCollapse(node)};
                            tree.display.update();
                            toggleCladeLabel(tree, node, selection_set)  
                            if (node.depth > 1) {tree.display.toggleCollapse(node)};
                            tree.display.update();
                            toggleCladeLabel(tree, node, selection_set)  
                            // toggleCladeLabel(tree, getNodesWithKey(tree.getRootNode(), value), selection_set)
                        }
                        });         
};

export function highlightAnnotationsPath(host, type) { 
    let nodes = selectAllAttributes(tree.getRootNode(), host, type)

    const matches = selection_set.filter(key => 
        nodes.some(node => key in node)
    );
    for (const d of nodes) {
        tree.display.modifySelection(tree.pathToRoot(d), "tag", false, true, "true");
        d3.select(`[data-node-name="${d.data.name}"]`)
            .classed("node-tagged", true);
    }

    for (const match of matches) {
        const node2 = getNodesWithKey(tree.getRootNode(), match);
        tree.display.toggleCollapse(node2).update();
        toggleCladeLabel(tree, node2, selection_set)  
        selection_set.forEach((value) => {
            if (match != value) {
                let node = getNodesWithKey(tree.getRootNode(), value)
                if (node.depth > 1) {tree.display.toggleCollapse(node)};
                tree.display.update();
                toggleCladeLabel(tree, node, selection_set)  
                if (node.depth > 1) {tree.display.toggleCollapse(node)};
                tree.display.update();
                toggleCladeLabel(tree, node, selection_set)  
                // toggleCladeLabel(tree, getNodesWithKey(tree.getRootNode(), value), selection_set)
            }
        });    
    }

}

export function createTree() {

     if ($('#tree_container').length > 0) {
        tree = new phylotree.phylotree(myTree);

        tree.render({
            container: "#tree_container",
            "draw-size-bubbles": false,
            "bubble-styler": d => { return 2 },
            "node-styler": node_colorizer,
            "edge-styler": edge_colorizer,
            "font-size": 12,
            zoom: false,
        });

    
        // Get selection set names from parsed newick
        if (tree.parsed_tags.length) { selection_set = tree.parsed_tags; }

        // THIS CHUNK WILL LOAD IT ON THE PAGE -- IT MUST BE HERE
        // Until a cleaner solution to supporting both Observable and regular HTML
        $(tree.display.container).append(tree.display.show());
        update_selection_names(null, null, tree, selection_set);


        ///////////////////////////////////////////////////////////////////////////////////////////////
        // THIS CODE SHRINKS ALL CLADES WHEN PAGE IS LOADED 
        selection_set.forEach((value) => {
            let node = getNodesWithKey(tree.getRootNode(), value)
            if (node.depth > 1) {tree.display.toggleCollapse(node)};
        });
        // This part ensures that the collapsed node moves with the branches - really funky way to do it
        tree.display.update()
        selection_set.forEach((value) => {
            let node = getNodesWithKey(tree.getRootNode(), value)
            toggleCladeLabel(tree, node, selection_set)
        });
        ///////////////////////////////////////////////////////////////////////////////////////////////


        //////////////////////////////////////////////////////////////////////////////////////////////////////
        // THIS CODE CONTROLS THE DIRECTIONAL BUTTONS (shrink, grow)
        $("[data-direction]").on("click", function(e) {
            var which_function = $(this).data("direction") == "vertical"
                                ? tree.display.spacing_x.bind(tree.display)
                                : tree.display.spacing_y.bind(tree.display);
            which_function(which_function() + +$(this).data("amount")).update();
            selection_set.forEach((value) => {
                                let node = getNodesWithKey(tree.getRootNode(), value)
                                if (node.depth > 1) {tree.display.toggleCollapse(node)};
                                tree.display.update();
                                toggleCladeLabel(tree, node, selection_set)  
                                // DO NOT TOUCH -- not sure why but it doesn't work unless you repeat these lines of code again
                                if (node.depth > 1) {tree.display.toggleCollapse(node)};
                                tree.display.update();
                                toggleCladeLabel(tree, node, selection_set)  
                                // do not touch
                            });
        });
        //////////////////////////////////////////////////////////////////////////////////////////////////////

    }


}

$(document).ready(function() {
    createTree();
   

});