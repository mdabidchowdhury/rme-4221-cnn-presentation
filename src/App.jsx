import React, { useState } from 'react';
import ResNetView from './components/architectures/T01_ResNetView';
import DenseNetView from './components/architectures/T02_DenseNetView';
import MobileNetView from './components/architectures/T03_MobileNetView';
import SqueezeNetView from './components/architectures/T04_SqueezeNetView';
import EfficientNetView from './components/architectures/T05_EfficientNetView';
import ResNeXtView from './components/architectures/T06_ResNeXtView';
import ShuffleNetView from './components/architectures/T07_ShuffleNetView';
import XceptionView from './components/architectures/T08_XceptionView';
import NASNetView from './components/architectures/T09_NASNetView';
import MobileNetV2View from './components/architectures/T10_MobileNetV2View';
import ConvNeXtView from './components/architectures/T11_ConvNeXtView';
import SENetView from './components/architectures/T12_SENetView';

const architectures = [
  { id: 'T-01', name: 'ResNet', component: <ResNetView /> },
  { id: 'T-02', name: 'DenseNet', component: <DenseNetView /> },
  { id: 'T-03', name: 'MobileNet', component: <MobileNetView /> },
  { id: 'T-04', name: 'SqueezeNet', component: <SqueezeNetView /> },
  { id: 'T-05', name: 'EfficientNet', component: <EfficientNetView /> },
  { id: 'T-06', name: 'ResNeXt', component: <ResNeXtView /> },
  { id: 'T-07', name: 'ShuffleNet', component: <ShuffleNetView /> },
  { id: 'T-08', name: 'Xception', component: <XceptionView /> },
  { id: 'T-09', name: 'NASNet', component: <NASNetView /> },
  { id: 'T-10', name: 'MobileNet V2', component: <MobileNetV2View /> },
  { id: 'T-11', name: 'ConvNeXt', component: <ConvNeXtView /> },
  { id: 'T-12', name: 'SENet', component: <SENetView /> },
];

export default function App() {
  const [activeTab, setActiveTab] = useState(architectures[0].id);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <header className="bg-blue-900 text-white p-6 shadow-md">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold">RME 4221: Machine Learning</h1>
          <h2 className="text-xl mt-2 text-blue-200">Group Presentation Assessment</h2>
          <p className="mt-1 text-sm">Presenters: Md. Abid Chowdhury, Samudra Jit Saha, Sayma Islam</p>
        </div>
      </header>

      <nav className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex space-x-4 p-4 overflow-x-auto">
          {architectures.map((arch) => (
            <button
              key={arch.id}
              onClick={() => setActiveTab(arch.id)}
              className={`px-4 py-2 rounded-md font-medium whitespace-nowrap transition-colors ${
                activeTab === arch.id ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {arch.id}: {arch.name}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6 mt-6 bg-white shadow-lg rounded-lg">
        {architectures.find((a) => a.id === activeTab)?.component}
      </main>
    </div>
  );
}