import React from 'react';
import InteractiveBlock from '../shared/InteractiveBlock';

export default function ResNetView() {
  return (
    <div className="space-y-8 animate-fadeIn">
      <h2 className="text-3xl font-extrabold text-gray-900 border-b-2 border-gray-200 pb-2">
        T-01: ResNet (Residual Networks)
      </h2>

      {/* Section 1 */}
      <section>
        <h3 className="text-2xl font-bold text-blue-800 mb-3">1. Motivation and Context</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          Prior to ResNet, deep learning faced a paradoxical problem: as neural networks became deeper, their accuracy would saturate and then rapidly degrade. This was not caused by overfitting, but rather the <strong>vanishing/exploding gradient problem</strong>. When backpropagating errors through dozens of layers, gradients become infinitely small, making it impossible to update the early layers of the network. ResNet was created to allow the training of networks with hundreds or thousands of layers without performance degradation.
        </p>
      </section>

      <hr />

      {/* Section 2 */}
      <section>
        <h3 className="text-2xl font-bold text-blue-800 mb-3">2. Architecture Design</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          The core innovation of ResNet is the <strong>Skip Connection</strong> (or shortcut connection). Instead of hoping each few stacked layers directly fit a desired underlying mapping $H(x)$, ResNet explicitly lets these layers fit a residual mapping $F(x) = H(x) - x$. The original mapping is recast into $F(x) + x$. This is realized by feedforward neural networks with "shortcut connections" that bypass one or more layers, performing identity mapping.
        </p>
        
        <InteractiveBlock 
          title="Initial Conv1 Layer (ResNet-50)" 
          defaultW={224} 
          defaultCin={3} 
          defaultK={7} 
          defaultS={2} 
          defaultP={3} 
          defaultCout={64} 
        />
      </section>

      <hr />

      {/* Section 3 */}
      <section>
        <h3 className="text-2xl font-bold text-blue-800 mb-3">3. Experimental Results and Impact</h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li><strong>ImageNet Performance:</strong> ResNet won the ILSVRC 2015 classification task with a top-5 error rate of 3.57%, surpassing human-level performance on this specific dataset.</li>
          <li><strong>Depth Scale:</strong> Allowed successful training of networks with 152 layers (ResNet-152), compared to VGG-16's 16 layers.</li>
          <li><strong>Legacy:</strong> Skip connections became a fundamental building block in modern deep learning, heavily influencing architectures like Transformers, DenseNet, and U-Net.</li>
        </ul>
      </section>

      <hr />

      {/* Section 4 */}
      <section>
        <h3 className="text-2xl font-bold text-blue-800 mb-3">4. Conclusion and Critical Reflection</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          While revolutionary, ResNet is not without limitations. As networks grow deeper, parameter counts and computational overhead increase significantly (ResNet-50 has ~25.6M parameters). Later research showed that many layers in ultra-deep ResNets contribute very little, acting almost as an ensemble of shallow networks. Future designs, like DenseNet and EfficientNet, built upon this by optimizing parameter efficiency and feature reuse rather than just brute-forcing depth.
        </p>
      </section>

      {/* References */}
      <section className="bg-gray-100 p-6 rounded-lg mt-8">
        <h3 className="text-xl font-bold text-gray-800 mb-3">References</h3>
        <ul className="list-decimal pl-6 text-sm text-gray-600 space-y-1">
          <li>He, K., Zhang, X., Ren, S., & Sun, J. (2016). Deep Residual Learning for Image Recognition. <em>CVPR</em>.</li>
          <li>RME 4221 Introduction to Machine Learning Presentation Assessment Rubric.</li>
        </ul>
      </section>
    </div>
  );
}