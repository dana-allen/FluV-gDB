import React, { useState } from "react";
import { ButtonGroup, Button } from "react-bootstrap";

import AutoCompleteFilter from "../../../components/filters/components/AutocompleteFilter";
import RegionCodonFilter from "../../../components/filters/components/RegionCodonFilter";

import submitApiQuery from "../../../callbacks/submitApiQuery";
import { loadJsonFromPublic } from "../../../utils/mutationsHelper";
// import { useErrorHandler } from "../../../contexts/ErrorHandlerContext";

const initialFilters = { host: "", region: "", codon: "" };
const initialExamples = { host: [], clade: [], region: [], codon: [] };

const MutationsFilter = ({ onDataLoad, onPending }) => {
  const [filters, setFilters] = useState(initialFilters);
  const [examples, setExamples] = useState(initialExamples);
  // const { triggerError } = useErrorHandler();

  // Handle filter change
  const handleChange = (key) => (value) => setFilters((prev) => ({ ...prev, [key]: value }));

  // Reset filters & examples
  const handleReset = () => {
    setFilters(initialFilters);
    setExamples(initialExamples);
  };

  // Load example values
  const handleLoadExample = async () => {
    loadJsonFromPublic("/examples/mutations.json", (data) => {
      if (!data) return;

      setExamples({
        host: data.host || [],
        clade: data.clade || [],
        region: data.region || [],
        codon: data.codon || [],
      });

      setFilters({
        host: data.host || "",
        region: data.region || "",
        codon: data.codon || "",
      });
    });
  };

  // Handle API response
  const handleData = async (response) => {
    if (response.status === 200) {
      const json = await response.json();
      onDataLoad(json);
    } else {
      // triggerError(response);
    }
    onPending(false);
  };

  // Submit query
  const handleSubmit = () => {
    onPending(true);
    const queryString = new URLSearchParams(filters).toString();
    const fullUrl = `${process.env.REACT_APP_BACKEND_URL}/api/analysis/mutations/${
      queryString ? `?${queryString}` : ""
    }`;
    submitApiQuery(fullUrl, false, handleData);
  };

  return (
    <div>
      <AutoCompleteFilter
        label="Host"
        url="/api/get_host_species/"
        idKey="host"
        handleId={handleChange("host")}
        exampleOptions={examples.host}
      />

      {/* Future Clade Filter (kept for later use)
      <AutoCompleteFilter
        label="Clade"
        url="/api/get_clades/"
        idKey="clade"
        handleId={handleChange("clade")}
        exampleOptions={examples.clade}
      /> 
      */}

      <RegionCodonFilter
        url="/api/mutations/get_mutation_regions_and_codons"
        handleRegion={handleChange("region")}
        handleCodon={handleChange("codon")}
        regionExample={examples.region}
        codonExample={examples.codon}
      />

      <div className="d-flex justify-content-between mt-3">
        <Button className="btn-main-filled" onClick={handleLoadExample}> Load Example </Button>
        <ButtonGroup>
          <Button className="btn-main" onClick={handleReset}> Reset </Button>
          <Button className="btn-main-filled" onClick={handleSubmit}> Submit </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default MutationsFilter;
