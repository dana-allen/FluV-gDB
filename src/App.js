import './App.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import './assets/styles/gdb-app-custom.css'

import React from 'react';
import { Router, BrowserRouter, Routes, Route } from "react-router-dom";
// import { ErrorMessage } from "@centre-for-virus-research/gdb-core-package"

// Components

import NavBar from './components/NavBar';
// import LoadingWheel from './components/LoadingWheel';
import Footer from "./components/Footer";


import Home from "./views/home";
import HowToCite from "./views/about/howToCite";
import Team from "./views/about/team";
import Statistics from "./views/about/statistics";
import Sequences from "./views/explore/sequences/sequences";
import Sequence from "./views/explore/sequences/sequence";
import References from "./views/explore/references/references";
import Reference from "./views/explore/references/reference";
import Mutations from './views/analysis/mutations/mutations';


import GlobalOverview from './views/explore/global_overview/global_overview';

import Alignment from './views/analysis/alignment/alignment';


import Api from './views/api/api';
import ApiInfo from './views/api/apiInfo';
import Help from './views/about/help';

import Documentation from './views/documentation';

import AdvancedSearch from './views/explore/advanced_search/advanced_search';
import { LoadingWheelProvider } from './contexts/LoadingWheelContext';
import LoadingWheel from './components/LoadingWheel';

import { ErrorHandlerProvider } from './contexts/ErrorHandlerContext';
import ErrorMessage from './components/ErrorMessage';


import Phylogeny from './views/explore/phylogeny';


import Isolates from './views/explore/isolates/isolates';
import Isolate from './views/explore/isolates/isolate';

function App() {
  return (
    <div className="App">
      
      {
        <ErrorHandlerProvider>
          <LoadingWheelProvider>
            <BrowserRouter>
              <NavBar /> 
            
              <Routes>

                {/* Homepage */}
                <Route exact path="/"               element={<Home />} />

                {/* Explore */}
                <Route exact path="/sequences"      element={<Sequences />} />
                <Route exact path="/sequence/:id"   element={<Sequence />} />
                <Route exact path="/references"     element={<References />} />
                <Route exact path="/reference/:id"  element={<Reference />} />
                <Route path="/global_overview"      element={<GlobalOverview />} />

                {/* About */}
                 <Route path="/howToCite"            element={<HowToCite />} />
                <Route path="/team"                 element={<Team />} />
                {/* <Route path="/version"              element={<Version />} /> */}
                <Route path="/statistics"           element={<Statistics />} />
                <Route path="/help"                 element={<Help />} /> 

                {/* API */}
                 <Route path="/api"                  element={<Api />} />
                <Route path="/apiInfo/:id"          element={<ApiInfo />} />
                

                {/* Analysis */}
                <Route path="/mutations"            element={<Mutations/>} />
                
                <Route path="/alignment"            element={<Alignment />} />

                {/* Other */}
                <Route path="/documentation"        element={<Documentation />} />
                <Route path="/advanced_search"      element={<AdvancedSearch />} />
                <Route path="/phylogeny"            element={<Phylogeny />} />

                <Route path="/isolates"            element={<Isolates />} />
                <Route exact path="/isolate/:id"   element={<Isolate />} />

              </Routes>
            </BrowserRouter>
            <LoadingWheel />
            <ErrorMessage/>
          </LoadingWheelProvider>
        </ErrorHandlerProvider>
      }
      <div className="container"> 
        <Footer />
      </div>
    </div>
  );
}

export default App;
