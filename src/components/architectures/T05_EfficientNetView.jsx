import React from 'react';
import InteractiveBlock from '../shared/InteractiveBlock';

export default function T05_EfficientNetView() {
  return (
    <div className="space-y-8 animate-fadeIn">
      <h2 className="text-3xl font-extrabold text-gray-900 border-b-2 border-gray-200 pb-2">
        T-05: EfficientNet (Rethinking Model Scaling)
      </h2>

      {/* Section 1 */}
      <section>
        <h3 className="text-2xl font-bold text-blue-800 mb-3">1. Motivation and Context</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          Historically, when researchers wanted to improve a network's accuracy, they would arbitrarily scale it up in one of three ways: make it deeper (more layers, like ResNet), make it wider (more channels, like WideResNet), or increase the input image resolution. However, scaling only one dimension quickly leads to diminishing returns. EfficientNet was motivated by the need for a principled, mathematically sound method to scale convolutional networks optimally across all three dimensions simultaneously given a fixed computational budget.
        </p>
      </section>

      <hr className="border-gray-300" />

      {/* Section 2 */}
      <section>
        <h3 className="text-2xl font-bold text-blue-800 mb-3">2. Architecture Design</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          The core innovation of EfficientNet is the <strong>Compound Scaling Method</strong>. It uses a compound coefficient $\phi$ to uniformly scale network width, depth, and resolution in a principled way:
          <br /><br />
          • Depth: $d = \alpha^\phi$ <br />
          • Width: $w = \beta^\phi$ <br />
          • Resolution: $r = \gamma^\phi$ <br />
          <br />
          The base network (EfficientNet-B0) was discovered using Neural Architecture Search (AutoML), optimizing for both accuracy and FLOPS. It primarily utilizes Mobile Inverted Bottleneck convolutions (MBConv), similar to MobileNetV2, combined with squeeze-and-excitation optimization.
        </p>
        
        {/* Simulating a High-Resolution Base Layer Processing */}
        <InteractiveBlock 
          title="EfficientNet Base Scaling Layer (High Resolution Input)" 
          defaultW={224} 
          defaultCin={3} 
          defaultK={3} 
          defaultS={2} 
          defaultP={1} 
          defaultCout={32} 
          revisionText="Here, channels are scaled SYSTEMATICALLY. Instead of an arbitrary guess, EfficientNet uses a compound coefficient formula to increase the channel width alongside depth and resolution, ensuring optimal parameter usage."
        />
        <p className="text-sm text-gray-500 italic mt-2">
          * Notice the input width/height (W<sub>in</sub> = 224). If we scaled this model up to EfficientNet-B7 using the compound formula, W<sub>in</sub> would jump to 600, significantly increasing the size of the intermediate feature maps to capture finer visual details!
        </p>
      </section>

      <hr className="border-gray-300" />

      {/* Section 3 */}
      <section>
        <h3 className="text-2xl font-bold text-blue-800 mb-3">3. Experimental Results and Impact</h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li><strong>State-of-the-Art Efficiency:</strong> EfficientNet-B7 achieved SOTA 84.3% top-1 accuracy on ImageNet while being 8.4x smaller and 6.1x faster on inference than the previous best model (GPipe).</li>
          <li><strong>Transfer Learning:</strong> The models transfer exceptionally well to other datasets (like CIFAR-100 and Flowers), achieving SOTA accuracy with a fraction of the parameters.</li>
          <li><strong>New Standard:</strong> The compound scaling method fundamentally changed how the industry approaches model scaling, shifting the focus from manual trial-and-error to systematic grid search formulas.</li>
        </ul>
      </section>

      <hr className="border-gray-300" />

      {/* Section 4 */}
      <section>
        <h3 className="text-2xl font-bold text-blue-800 mb-3">4. Conclusion and Critical Reflection</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          EfficientNet is widely considered one of the most elegant CNN architectures ever designed. However, its main limitation is the massive initial computational cost required to find the baseline $\alpha$, $\beta$, and $\gamma$ constants using AutoML grid search. Furthermore, while the FLOPS count is exceptionally low, the memory usage during training can still be quite high due to the large resolution sizes mandated by the scaling formula in the larger variants (B5 through B7).
        </p>
      </section>

      {/* References */}
      <section className="bg-gray-100 p-6 rounded-lg mt-8">
        <h3 className="text-xl font-bold text-gray-800 mb-3">References</h3>
        <ul className="list-decimal pl-6 text-sm text-gray-600 space-y-1">
          <li>Tan, M., & Le, Q. (2019). EfficientNet: Rethinking Model Scaling for Convolutional Neural Networks. <em>ICML</em>.</li>
          <li>RME 4221 Introduction to Machine Learning Presentation Assessment Rubric.</li>
        </ul>
      </section>
    </div>
  );
}