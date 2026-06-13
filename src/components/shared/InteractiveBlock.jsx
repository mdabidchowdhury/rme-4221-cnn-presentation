import React, { useState } from 'react';

export default function InteractiveBlock({ title, defaultW, defaultK, defaultS, defaultP, defaultCin, defaultCout }) {
  const [wIn, setWIn] = useState(defaultW);
  const [hIn, setHIn] = useState(defaultW);
  const [cIn, setCIn] = useState(defaultCin);

  const k = defaultK;
  const s = defaultS;
  const p = defaultP;
  const cOut = defaultCout;

  // Formula: floor((W - K + 2P) / S) + 1
  const calcDim = (dim) => Math.floor((dim - k + 2 * p) / s) + 1;
  const wOut = calcDim(wIn);
  const hOut = calcDim(hIn);

  return (
    <div className="border border-blue-200 rounded-lg p-6 my-6 bg-blue-50 relative overflow-hidden">
      <h4 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
        <span className="animate-pulse h-3 w-3 bg-blue-500 rounded-full mr-2"></span>
        Interactive Simulation: {title}
      </h4>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Input Block */}
        <div className="bg-white p-4 rounded shadow">
          <h5 className="font-semibold text-gray-700 mb-2">Input Tensor</h5>
          <div className="space-y-2 text-sm">
            <label className="block">Width (W<sub>in</sub>): <input type="number" value={wIn} onChange={e => setWIn(Number(e.target.value))} className="w-16 border rounded px-1 ml-2"/></label>
            <label className="block">Height (H<sub>in</sub>): <input type="number" value={hIn} onChange={e => setHIn(Number(e.target.value))} className="w-16 border rounded px-1 ml-2"/></label>
            <label className="block">Channels (C<sub>in</sub>): <input type="number" value={cIn} onChange={e => setCIn(Number(e.target.value))} className="w-16 border rounded px-1 ml-2"/></label>
          </div>
          <div className="mt-3 text-center font-mono bg-gray-100 p-2 rounded">
            {wIn} × {hIn} × {cIn}
          </div>
        </div>

        {/* Operation Block */}
        <div className="flex flex-col items-center justify-center text-blue-600">
          <div className="font-mono text-sm bg-blue-100 p-3 rounded-full mb-2 shadow-inner">
            K:{k} | S:{s} | P:{p}
          </div>
          <div className="text-2xl animate-bounce">↓</div>
          <div className="text-sm font-semibold">Convolutional Filter</div>
        </div>

        {/* Output Block */}
        <div className="bg-white p-4 rounded shadow border-l-4 border-green-500">
          <h5 className="font-semibold text-gray-700 mb-2">Output Tensor</h5>
          <div className="space-y-2 text-sm text-gray-600">
            <p>Width (W<sub>out</sub>): {wOut}</p>
            <p>Height (H<sub>out</sub>): {hOut}</p>
            <p>Channels (C<sub>out</sub>): {cOut}</p>
          </div>
          <div className="mt-3 text-center font-mono bg-green-50 text-green-800 p-2 rounded">
            {wOut} × {hOut} × {cOut}
          </div>
        </div>
      </div>
    </div>
  );
}