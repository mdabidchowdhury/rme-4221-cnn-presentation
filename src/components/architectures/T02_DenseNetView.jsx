import React from 'react';
import InteractiveBlock from '../shared/InteractiveBlock';

export default function T02_DenseNetView() {
  return (
    <div className="space-y-8 animate-fadeIn">
      <h2 className="text-3xl font-extrabold text-gray-900 border-b-2 border-gray-200 pb-2">
        T-02: DenseNet (Densely Connected Convolutional Networks)
      </h2>

      {/* Section 1 */}
      <section>
        <h3 className="text-2xl font-bold text-blue-800 mb-3">1. Motivation and Context</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          While ResNet solved the vanishing gradient problem by adding shortcut connections, it introduced a new inefficiency: many layers in a ResNet contribute very little and are essentially redundant. Furthermore, ResNet combines features by <em>adding</em> them together, which can impede the flow of information. DenseNet was created to maximize information flow and feature reuse by explicitly connecting all layers directly to one another.
        </p>
      </section>

      <hr className="border-gray-300" />

      {/* Section 2 */}
      <section>
        <h3 className="text-2xl font-bold text-blue-800 mb-3">2. Architecture Design</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          The core innovation of DenseNet is the <strong>Dense Block</strong>. Instead of drawing representational power from extremely deep or wide architectures, DenseNet relies on feature reuse. In a Dense Block, each layer receives the feature maps of <em>all preceding layers</em> as its input, and passes its own feature maps to <em>all subsequent layers</em>. Crucially, features are combined by <strong>concatenation</strong>, not summation. This means the network continuously accumulates knowledge, guided by a hyperparameter called the "growth rate" (often k = 32), which dictates how many new channels each layer adds to the global state.
        </p>
        
        {/* Simulating a 3x3 Conv inside a Dense Block */}
        <InteractiveBlock 
          title="Dense Block Layer (Growth Rate k=32)" 
          defaultW={56} 
          defaultCin={64} 
          defaultK={3} 
          defaultS={1} 
          defaultP={1} 
          defaultCout={32} 
          revisionText="Here, the channels ACCUMULATE. Instead of exploding, the network generates 32 new feature maps (the growth rate, k=32). Crucially, DenseNet concatenates these 32 new channels with the original 64, passing a total of 96 channels to the next layer!"
        />
        <p className="text-sm text-gray-500 italic mt-2">
          * Notice how the output channels (C<sub>out</sub> = 32) represent the new knowledge generated. This will be concatenated with the C<sub>in</sub> = 64 to pass 96 channels to the next layer!
        </p>
      </section>

      <hr className="border-gray-300" />

      {/* Section 3 */}
      <section>
        <h3 className="text-2xl font-bold text-blue-800 mb-3">3. Experimental Results and Impact</h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li><strong>Parameter Efficiency:</strong> DenseNet-201 achieves similar ImageNet accuracy to ResNet-101 but requires roughly half the parameters (~20M vs ~45M).</li>
          <li><strong>Feature Propagation:</strong> The architecture naturally scales well to tasks requiring high-resolution details, influencing models in medical image segmentation and super-resolution.</li>
          <li><strong>Regularization:</strong> The dense connectivity provides an implicit "deep supervision" effect, making the network much easier to train and highly resistant to overfitting on smaller datasets.</li>
        </ul>
      </section>

      <hr className="border-gray-300" />

      {/* Section 4 */}
      <section>
        <h3 className="text-2xl font-bold text-blue-800 mb-3">4. Conclusion and Critical Reflection</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          DenseNet proved that neural networks do not need to be exceedingly wide or deep to be highly accurate; they just need to reuse features efficiently. However, the architecture's reliance on continuous tensor concatenation creates massive memory bottlenecks during backpropagation. Training a DenseNet requires significantly more VRAM than a ResNet of equivalent depth, leading subsequent designs (like EfficientNet) to seek a more balanced approach to scaling.
        </p>
      </section>

      {/* References */}
      <section className="bg-gray-100 p-6 rounded-lg mt-8">
        <h3 className="text-xl font-bold text-gray-800 mb-3">References</h3>
        <ul className="list-decimal pl-6 text-sm text-gray-600 space-y-1">
          <li>Huang, G., Liu, Z., Van Der Maaten, L., & Weinberger, K. Q. (2017). Densely Connected Convolutional Networks. <em>CVPR</em>.</li>
          <li>RME 4221 Introduction to Machine Learning Presentation Assessment Rubric.</li>
        </ul>
      </section>
    </div>
  );
}