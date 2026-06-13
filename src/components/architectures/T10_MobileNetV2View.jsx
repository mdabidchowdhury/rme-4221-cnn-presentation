import React from 'react';
import InteractiveBlock from '../shared/InteractiveBlock';

export default function T10_MobileNetV2View() {
  return (
    <div className="space-y-8 animate-fadeIn">
      <h2 className="text-3xl font-extrabold text-gray-900 border-b-2 border-gray-200 pb-2">
        T-10: MobileNet V2 (Inverted Residuals and Linear Bottlenecks)
      </h2>

      {/* Section 1 */}
      <section>
        <h3 className="text-2xl font-bold text-blue-800 mb-3">1. Motivation and Context</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          While the original MobileNet (V1) was incredibly efficient, researchers noticed a problem during training: the ReLU activation functions were "killing" channels. Because MobileNet uses very few channels (a low-dimensional manifold) to save compute, setting negative values to zero via ReLU destroyed a significant portion of the information. MobileNet V2 was designed specifically to prevent this data destruction while maintaining the extreme efficiency required for mobile devices.
        </p>
      </section>

      <hr className="border-gray-300" />

      {/* Section 2 */}
      <section>
        <h3 className="text-2xl font-bold text-blue-800 mb-3">2. Architecture Design</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          V2 introduces two massive innovations to solve the dead-channel problem:
          <br /><br />
          1. <strong>Inverted Residuals:</strong> Standard ResNets squeeze channels, process them, and expand them back. MobileNet V2 <em>inverts</em> this: it takes a small number of channels, expands them massively (usually by a factor of 6) using a 1x1 convolution, applies the depthwise convolution in this safe, high-dimensional space, and then squeezes them back down. <br />
          2. <strong>Linear Bottlenecks:</strong> When the tensor is squeezed back down to a small number of channels at the end of the block, <em>no activation function (no ReLU) is applied</em>. This "linear bottleneck" ensures that zero information is destroyed by clipping before moving to the next layer.
        </p>
        
        {/* Simulating the Expansion Phase */}
        <InteractiveBlock 
          title="Inverted Residual Expansion Phase (Expansion Ratio = 6)" 
          defaultW={28} 
          defaultCin={24} 
          defaultK={1} 
          defaultS={1} 
          defaultP={0} 
          defaultCout={144} 
          revisionText="Here, channels TEMPORARILY EXPLODE from 24 to 144. It expands by 6x into a high-dimensional space just so the ReLU activation function doesn't permanently destroy data, before squashing it back down linearly."
        />
        <p className="text-sm text-gray-500 italic mt-2">
          * Notice how a tiny input of C<sub>in</sub> = 24 is instantly expanded to C<sub>out</sub> = 144. This temporary high-dimensional space allows the subsequent depthwise convolutions to apply ReLU safely without risking total information loss!
        </p>
      </section>

      <hr className="border-gray-300" />

      {/* Section 3 */}
      <section>
        <h3 className="text-2xl font-bold text-blue-800 mb-3">3. Experimental Results and Impact</h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li><strong>Performance Leap:</strong> Achieved 72.0% top-1 accuracy on ImageNet using only 3.4M parameters, significantly outperforming MobileNet V1 and SqueezeNet.</li>
          <li><strong>Object Detection:</strong> When paired with the SSD (Single Shot Detector) framework (forming SSDLite), it became the absolute gold standard for real-time object detection on smartphones.</li>
          <li><strong>Architectural Standard:</strong> The Inverted Residual Block became one of the most widely used building blocks in modern CNN design, directly utilized by EfficientNet.</li>
        </ul>
      </section>

      <hr className="border-gray-300" />

      {/* Section 4 */}
      <section>
        <h3 className="text-2xl font-bold text-blue-800 mb-3">4. Conclusion and Critical Reflection</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          MobileNet V2 is a brilliant example of understanding the mathematical side-effects of activation functions. However, the expansion phase (jumping to 6x channels) creates a temporary spike in memory consumption (RAM) during inference. For ultra-constrained microcontrollers (like standard Arduino boards), this temporary memory footprint can sometimes cause out-of-memory errors, an issue that inspired further micro-optimizations in the edge AI space.
        </p>
      </section>

      {/* References */}
      <section className="bg-gray-100 p-6 rounded-lg mt-8">
        <h3 className="text-xl font-bold text-gray-800 mb-3">References</h3>
        <ul className="list-decimal pl-6 text-sm text-gray-600 space-y-1">
          <li>Sandler, M., Howard, A., Zhu, M., Zhmoginov, A., & Chen, L. C. (2018). MobileNetV2: Inverted Residuals and Linear Bottlenecks. <em>CVPR</em>.</li>
          <li>RME 4221 Introduction to Machine Learning Presentation Assessment Rubric.</li>
        </ul>
      </section>
    </div>
  );
}