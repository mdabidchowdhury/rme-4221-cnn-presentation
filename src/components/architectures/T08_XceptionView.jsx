import React from 'react';
import InteractiveBlock from '../shared/InteractiveBlock';

export default function T08_XceptionView() {
  return (
    <div className="space-y-8 animate-fadeIn">
      <h2 className="text-3xl font-extrabold text-gray-900 border-b-2 border-gray-200 pb-2">
        T-08: Xception (Extreme Inception)
      </h2>

      {/* Section 1 */}
      <section>
        <h3 className="text-2xl font-bold text-blue-800 mb-3">1. Motivation and Context</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          The Inception architecture series proved successful by assuming that cross-channel correlations and spatial correlations in a feature map can be mapped completely independently. Xception was motivated by taking this hypothesis to its "extreme" conclusion: what if we completely decouple these two operations? Instead of grouping channels into complex, multi-branch Inception modules, the creator of Xception designed a network entirely around depthwise separable convolutions (similar to MobileNet, but developed concurrently with a slightly different order of operations).
        </p>
      </section>

      <hr className="border-gray-300" />

      {/* Section 2 */}
      <section>
        <h3 className="text-2xl font-bold text-blue-800 mb-3">2. Architecture Design</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          The core innovation of Xception is replacing Inception modules with <strong>Extreme Depthwise Separable Convolutions</strong>. 
          <br /><br />
          While standard MobileNet performs depthwise (spatial) convolution <em>then</em> a 1x1 pointwise (cross-channel) convolution, Xception reverses this: it performs the 1x1 cross-channel mapping first, followed by the spatial depthwise convolution. Crucially, Xception <strong>removes the non-linearity (ReLU)</strong> between these two operations, proving that adding intermediate activation functions actually harms performance in this specific decoupled setup. This is combined with standard ResNet-style skip connections throughout the network.
        </p>
        
        {/* Simulating an Xception Depthwise Convolution Block */}
        <InteractiveBlock 
          title="Xception Block (Spatial Convolution Phase)" 
          defaultW={71} 
          defaultCin={256} 
          defaultK={3} 
          defaultS={2} 
          defaultP={1} 
          defaultCout={256} 
          revisionText="Here, channels remain STRICTLY ISOLATED (256 to 256). Because Xception completely decouples spatial math from cross-channel math, this layer only looks at spatial dimensions. Zero cross-channel mixing happens here."
        />
        <p className="text-sm text-gray-500 italic mt-2">
          * Notice how the spatial dimensions (W<sub>in</sub>, H<sub>in</sub>) are downsampled by a stride of 2, but the channel count (C<sub>in</sub> to C<sub>out</sub>) remains exactly the same. The channels are mapped purely spatially here, with zero cross-channel mixing!
        </p>
      </section>

      <hr className="border-gray-300" />

      {/* Section 3 */}
      <section>
        <h3 className="text-2xl font-bold text-blue-800 mb-3">3. Experimental Results and Impact</h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li><strong>Outperforming Inception:</strong> Xception slightly outperformed Inception V3 on ImageNet while having exactly the same number of parameters (~23 million), proving its parameter utilization was mathematically superior.</li>
          <li><strong>Large-Scale Dominance:</strong> On Google's massive internal JFT dataset (350 million images), Xception showed significant improvements over Inception V3, indicating better scaling capacity.</li>
          <li><strong>Framework Integration:</strong> Due to its elegant, homogeneous design, it became a standard, easy-to-implement baseline model in frameworks like Keras and TensorFlow.</li>
        </ul>
      </section>

      <hr className="border-gray-300" />

      {/* Section 4 */}
      <section>
        <h3 className="text-2xl font-bold text-blue-800 mb-3">4. Conclusion and Critical Reflection</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          Xception beautifully simplified the overly complex "Frankenstein-like" branching of the original Inception models into a clean, repeatable block. However, similar to MobileNet, its reliance on pure depthwise convolutions means that it doesn't always map perfectly to the memory architectures of certain hardware accelerators, sometimes resulting in lower-than-expected inference speeds on desktop GPUs compared to simple, unfragmented architectures like VGG or standard ResNet.
        </p>
      </section>

      {/* References */}
      <section className="bg-gray-100 p-6 rounded-lg mt-8">
        <h3 className="text-xl font-bold text-gray-800 mb-3">References</h3>
        <ul className="list-decimal pl-6 text-sm text-gray-600 space-y-1">
          <li>Chollet, F. (2017). Xception: Deep Learning with Depthwise Separable Convolutions. <em>CVPR</em>.</li>
          <li>RME 4221 Introduction to Machine Learning Presentation Assessment Rubric.</li>
        </ul>
      </section>
    </div>
  );
}