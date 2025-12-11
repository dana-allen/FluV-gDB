import useFetch from "./useFetch";


function usePhylogenyTree() {
    
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/phylogeny/tree/`;
    const { data, ...rest } = useFetch(url);

    const tree = data && data.tree

     // Convert to CSV text
    // const csvHeader = "Parsed_strain,host\n";
    // const csvBody = data && data.meta_data
    //   .map(row => `${row.Parsed_strain},${row.host}`)
    //   .join("\n");

    // const meta_data = csvHeader + csvBody;
    const meta_data = null

    return {tree, meta_data, ...rest };

};

export default usePhylogenyTree;