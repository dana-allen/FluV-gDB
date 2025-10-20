/**
 * Parses and formats country data by converting each country's M49 code to a three-character string
 * and organizing the data into an object keyed by the formatted M49 code.
 * 
 * @function
 * @param {Array} data - An array of country data objects. Each object should contain:
 *                       - `m49_code` (number): The country's M49 code, a numeric identifier.
 *                       - `sequence_count` (number): The count of sequences for corresponding country
 *                       - `display_name` (string): The name of the country.
 * @returns {Object} - Returns an object where each key is a zero-padded M49 code, and each value is an
 *                     object containing:
 *                     - `count`: The country's count value.
 *                     - `display_name`: The country's display name.
 */
// export const parseCountryData = (data) => {

//     const newData = data.reduce((acc, current) => {
//         var m49_code = String(current.m49_code);
        
//         if (m49_code.length < 3){
//             m49_code = "0"+m49_code
//         }
//         acc[m49_code] = {
//             count: current["sequence_count"],
//             display_name: current.display_name
//         };
//         return acc;
//     }, {});

//     return newData;
// }; 
export const parseCountryData = (data) => {
    // 1. Get total count across all countries
    const total = data.reduce((sum, current) => sum + current.sequence_count, 0);

    // 2. Build object with percentage included
    const newData = data.reduce((acc, current) => {
        let m49_code = String(current.m49_code).padStart(3, "0"); // ensures always 3 digits

        acc[m49_code] = {
            count: current.sequence_count,
            percentage: total > 0 ? ((current.sequence_count / total) * 100).toFixed(2) : "0.00",
            display_name: current.display_name,
        };

        return acc;
    }, {});

    return newData;
};


/**
 * Calculates the maximum and minimum country counts from an array of country data objects.
 * 
 * @function
 * @param {Array} data - An array of country data objects. Each object should include:
 *                       - `sequence_count` (number): The count associated with each country (e.g., population, cases).
 * @returns {Object} - Returns an object with:
 *                     - `max`: The highest `sequence_count` value found in the data array.
 *                     - `min`: The lowest `sequence_count` value found in the data array.
 */
export const parseSequenceCounts = (data) => {
    const result = data.reduce(
        (acc, curr) => {
        
          if (curr.sequence_count > acc.max) acc.max = curr.sequence_count;
          if (curr.sequence_count < acc.min) acc.min = curr.sequence_count;
          return acc;
        },
        { max: data[0].sequence_count, min: data[0].sequence_count }
      );
    return result;
};
// export const parseSequenceCounts = (data) => {
//     const result = data.reduce(
//         (acc, curr) => {
        
//           if (curr.sequence_count > acc.max) acc.max = curr.sequence_count;
//           if (curr.sequence_count < acc.min) acc.min = curr.sequence_count;
//           return acc;
//         },
//         { max: data[0].sequence_count, min: data[0].sequence_count }
//       );
//     return result;
// };