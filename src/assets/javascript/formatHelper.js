/**
 * Formats a region string by replacing underscores with spaces.
 * 
 * @function
 * @param {string} region - The region string to format.
 * @returns {string} - The formatted region string with underscores replaced by spaces.
 * 
 * @example
 * // returns "North America"
 * formatRegion("North_America");
 */
export const formatRegion = (region) => {
    if (region != undefined){
        region = region.replace(/_/g, " ");
    }
    return region;
};

/**
 * Determines the developing status of a country based on input flags for 
 * Least Developed Countries (LDC), Landlocked Developing Countries (LLDC), 
 * and Small Island Developing States (SIDS).
 * 
 * @function
 * @param {string} isLDC - Flag indicating if the country is a Least Developed Country (LDC). 
 *                         Uses the Unicode character '\u0001' if true.
 * @param {string} isLLDC - Flag indicating if the country is a Landlocked Developing Country (LLDC). 
 *                          Uses the Unicode character '\u0001' if true.
 * @param {string} isSids - Flag indicating if the country is a Small Island Developing State (SIDS). 
 *                          Uses the Unicode character '\u0001' if true.
 * @returns {string} - A string describing the developing status of the country. Returns one of the 
 *                     following: "Least developed country (LDC)", "Landlocked developing country (LLDC)", 
 *                     "Small island developing state (SIDS)", or "-" if none of the flags are set.
 * 
 * @example
 * // returns "Least developed country (LDC)"
 * formatDevelopingStatus('\u0001', undefined, undefined);
 */

export const formatDevelopingStatus = (isLDC, isLLDC, isSids) => {
    var status = '-';
    if (isLDC == '\u0001') status = 'Least developed country (LDC)';
    if (isLLDC == '\u0001') status = 'Landlocked developing country (LLDC)';
    if (isSids == '\u0001') status = 'Small island developing state (SIDS)';
    return status;
    
}

/**
 * Formats the patent-related status based on a given flag.
 * 
 * @function
 * @param {string} patentRelated - A flag indicating if an item is patent-related.
 *                                 Uses the Unicode character '\u0001' for "Yes" 
 *                                 and '\u0000' for "No".
 * @returns {string} - Returns "Yes" if `patentRelated` is '\u0001', "No" if it is '\u0000', 
 *                     and an empty string if neither condition is met.
 * 
 * @example
 * // returns "Yes"
 * formatPatentRelated('\u0001');
 * 
 * @example
 * // returns "No"
 * formatPatentRelated('\u0000');

 */
export const formatPatentRelated = (patentRelated) => {
    var patent;
    if (patentRelated == '\u0001'){
        patent = 'Yes';
    } else if (patentRelated == '\u0000') {
        patent = 'No';
    } else {
        patent = '';
    }
    return patent;
};

/**
 * Formats a collection year range based on the earliest and latest years provided.
 * 
 * @function
 * @param {number|null} earliest - The earliest year of the collection range, or `null` if unknown.
 * @param {number|null} latest - The latest year of the collection range, or `null` if unknown.
 * @returns {string} - A formatted string representing the year range.
 *                     Returns:
 *                     - `"-"` if both `earliest` and `latest` are `null`.
 *                     - The `earliest` year if it equals `latest`.
 *                     - `"earliest to latest"` if both are provided but not equal.
 *                     - `"latest or earlier"` if only `latest` is defined.
 *                     - `"earliest or later"` if only `earliest` is defined.
 * 
 * @example
 * // returns "2000 to 2020"
 * formatCollectionYearRange(2000, 2020);
 * 
 * @example
 * // returns "2020 or earlier"
 * formatCollectionYearRange(null, 2020);
 * 
 * @example
 * // returns "2000 or later"
 * formatCollectionYearRange(2000, null);
 */
export const formatCollectionYearRange = (earliest, latest) => {
    if (earliest == null && latest == null) {
        return "-";
    }
    if (earliest != null && latest != null) {
        if(earliest == latest) {
            return earliest;
        } else {
            return earliest + " to " + latest;
        }
        
    }
    if (earliest == null) {
        return latest + " or earlier";
    }
    return earliest + " or later";
};

/**
 * Converts a binary-like input value to a readable string representation of "Yes" or "No".
 * 
 * @function
 * @param {string} value - A binary flag represented as a Unicode character.
 *                         `'\u0001'` indicates "Yes", and `'\u0000'` indicates "No".
 * @returns {string} - Returns "Yes" if `value` is `'\u0001'`, "No" if `value` is `'\u0000'`, 
 *                     and "-" if the value is neither.
 * 
 * @example
 * // returns "Yes"
 * formatBinary('\u0001');
 * 
 * @example
 * // returns "No"
 * formatBinary('\u0000');

 */
export const formatBinary = (value) => {
    var convertedValue;
    if (value == '\u0001'){
        convertedValue = "Yes";
    } else if (value == '\u0000') {
        convertedValue = "No";
    } else {
        convertedValue = '-';
    }
    return convertedValue;
};


export const originalSequence = (sequence) => {

}

export const formatMetaDataRegions = (regions) => {
    var region = {};
    region["display_name"] = regions["display_name"]
    region["id"] = regions["id"]
    region["development_status"] = regions["development_status"]
    region["status"] = formatDevelopingStatus(regions.is_ldc, regions.is_lldc, regions.is_sids);
    region.m49_region_id = formatRegion(regions.m49_region_id);
    region.m49_sub_region_id = formatRegion(regions.m49_sub_region_id);

    return(region);

}

export const formatGenomeCoverage = (alignment, start_codon, end_codon) => {
    
    const split_sequence = alignment.slice(start_codon, end_codon);
    const original_sequence = split_sequence.replace(/-/g, '');
    const coverage = original_sequence.length/(split_sequence.length)*100;

    return coverage.toFixed(2);
}