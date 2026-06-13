import React from 'react';
import InteractiveBlock from '../shared/InteractiveBlock';

export default function T03_MobileNetView() {
  return (
    <div className="space-y-8 animate-fadeIn">
      <h2 className="text-3xl font-extrabold text-gray-900 border-b-2 border-gray-200 pb-2">
        T-03: MobileNet (Efficient CNNs for Mobile Vision)
      </h2>

      {/* Section 1 */}
      <section>
        <h3 className="text-2xl font-bold text-blue-800 mb-3">1. Motivation and Context</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          As deep learning models like ResNet and DenseNet achieved state-of-the-art accuracy, they also became increasingly bulky and computationally expensive. This created a barrier for deploying advanced computer vision applications on edge devices with limited power, memory, and computational capacity (like smartphones and embedded robotics). MobileNet was introduced by Google researchers to address this specific need, focusing on optimizing for latency and size rather than solely maximizing accuracy.
        </p>
      </section>

      <hr className="border-gray-300" />

      {/* Section 2 */}
      <section>
        <h3 className="text-2xl font-bold text-blue-800 mb-3">2. Architecture Design</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          The core innovation of MobileNet is the replacement of standard convolutional layers with <strong>Depthwise Separable Convolutions</strong>. This process splits a standard convolution into two separate layers:
          <br /><br />
          1. <strong>Depthwise Convolution:</strong> Applies a single filter to each input channel independently (spatial filtering).<br />
          2. <strong>Pointwise Convolution:</strong> Applies a 1x1 convolution to combine the outputs of the depthwise layer across all channels (feature combination).
          <br /><br />
          This factorization drastically reduces computation and model size. For a 3x3 kernel, this approach requires roughly 8 to 9 times less computation than standard convolutions.
        </p>
        
        {/* Simulating a Depthwise Convolution Phase */}
        <InteractiveBlock 
          title="Depthwise Separable Stage (Spatial Filter Only)" 
          defaultW={112} 
          defaultCin={32} 
          defaultK={3} 
          defaultS={1} 
          defaultP={1} 
          defaultCout={32} 
          revisionText="Here, the channels STAY THE SAME (32 to 32). In a depthwise convolution, the network applies exactly ONE filter per channel, refusing to mix them yet. This spatial-only math saves tremendous computing power on mobile processors."
        />
        <p className="text-sm text-gray-500 italic mt-2">
          * Notice that in the Depthwise stage, C<sub>out</sub> equals C<sub>in</sub> (32). Standard convolutions would immediately expand this to the final channel count, but MobileNet delays that until the subsequent 1x1 Pointwise layer to save compute!
        </p>
      </section>

      <hr className="border-gray-300" />

      {/* Section 3 */}
      <section>
        <h3 className="text-2xl font-bold text-blue-800 mb-3">3. Experimental Results and Impact</h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li><strong>Efficiency Benchmark:</strong> Compared to VGG-16, MobileNet achieved comparable accuracy on ImageNet but was 32 times smaller in size and 27 times less computationally intensive.</li>
          <li><strong>Hyperparameter Control:</strong> Introduced two global hyperparameters—Width Multiplier ($\alpha$) and Resolution Multiplier ($\rho$)—allowing developers to actively trade off accuracy for latency based on their specific hardware limits.</li>
          <li><strong>Edge AI Standardization:</strong> MobileNet established the blueprint for embedded machine learning, enabling real-time object detection and facial recognition on low-power architectures.</li>
          <li><strong>Numerical Example:</strong> By splitting the math, a standard 3x3 depthwise separable convolution reduces the computational cost (FLOPS) by roughly 8 to 9 times compared to a standard 3x3 convolution.</li>
          <li><strong>Practical Applications:</strong> Real-time face unlocking and Augmented Reality (AR) filters on mobile phones, where high frame rates and low battery drain are critical.</li>
        </ul>
      </section>

      <hr className="border-gray-300" />

      {/* Section 4 */}
      <section>
        <h3 className="text-2xl font-bold text-blue-800 mb-3">4. Conclusion and Critical Reflection</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          MobileNet successfully demonstrated that smart architectural design can overcome hardware constraints. However, its primary limitation lies in its heavy reliance on depthwise convolutions, which can suffer from a problem where many filters die off and output zeros during training (due to ReLU). Furthermore, while the mathematical operations are reduced, the memory access patterns of depthwise separable convolutions are less efficient on certain hardware accelerators, an issue that prompted the development of MobileNetV2.
        </p>
      </section>

      {/* References */}
      <section className="bg-gray-100 p-6 rounded-lg mt-8">
        <h3 className="text-xl font-bold text-gray-800 mb-3">References</h3>
        <ul className="list-decimal pl-6 text-sm text-gray-600 space-y-1">
          <li>Howard, A. G., et al. (2017). MobileNets: Efficient Convolutional Neural Networks for Mobile Vision Applications. <em>arXiv preprint arXiv:1704.04861</em>.</li>
          <li>RME 4221 Introduction to Machine Learning Presentation Assessment Rubric[cite: 1, 2, 4].</li>
        </ul>
      </section>
    </div>
  );
}