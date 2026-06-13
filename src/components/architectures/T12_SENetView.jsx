import React from 'react';
import InteractiveBlock from '../shared/InteractiveBlock';

export default function T12_SENetView() {
  return (
    <div className="space-y-8 animate-fadeIn">
      <h2 className="text-3xl font-extrabold text-gray-900 border-b-2 border-gray-200 pb-2">
        T-12: SENet (Squeeze-and-Excitation Networks)
      </h2>

      {/* Section 1 */}
      <section>
        <h3 className="text-2xl font-bold text-blue-800 mb-3">1. Motivation and Context</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          Historically, convolutional layers treat every channel in a feature map equally when extracting spatial patterns. However, if a network is looking at an image of a dog, a channel that detected "fur texture" is vastly more important than a channel that detected "blue sky." SENet introduced a mechanism for the network to explicitly perform "feature recalibration"—learning to use global information to selectively emphasize informative features and suppress less useful ones.
        </p>
      </section>

      <hr className="border-gray-300" />

      {/* Section 2 */}
      <section>
        <h3 className="text-2xl font-bold text-blue-800 mb-3">2. Architecture Design</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          The core innovation is the <strong>Squeeze-and-Excitation (SE) Block</strong>, which can be plugged into <em>any</em> existing architecture. It works in three phases:
          <br /><br />
          1. <strong>Squeeze:</strong> Global Average Pooling compresses the spatial dimensions (W x H x C) down to a tiny 1x1xC vector, summarizing the global state of every channel.<br />
          2. <strong>Excitation:</strong> A small two-layer Fully Connected (Dense) network analyzes this 1x1xC vector and outputs a set of weights between 0 and 1 (via Sigmoid) for each channel.<br />
          3. <strong>Scale:</strong> The original W x H x C feature map is multiplied by these weights. Important channels are multiplied by ~1.0 (kept), and useless channels are multiplied by ~0.0 (silenced).
        </p>
        
        {/* Simulating the Squeeze Phase */}
        <InteractiveBlock 
          title="Squeeze Phase (Global Average Pooling)" 
          defaultW={56} 
          defaultCin={256} 
          defaultK={56} 
          defaultS={1} 
          defaultP={0} 
          defaultCout={256} 
        />
        <p className="text-sm text-gray-500 italic mt-2">
          * Notice that the Kernel size (K=56) is exactly equal to the Input Width (W<sub>in</sub>=56). This effectively "squashes" the entire spatial grid down into a W<sub>out</sub>=1, H<sub>out</sub>=1 tensor, leaving only the C=256 channels! This vector is then evaluated to decide which of the 256 channels are actually important.
        </p>
      </section>

      <hr className="border-gray-300" />

      {/* Section 3 */}
      <section>
        <h3 className="text-2xl font-bold text-blue-800 mb-3">3. Experimental Results and Impact</h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li><strong>Winning ILSVRC:</strong> SENet conclusively won the 2017 ImageNet classification challenge, achieving a staggering top-5 error of just 2.251%.</li>
          <li><strong>Universal Applicability:</strong> The authors showed that dropping SE blocks into existing networks (creating SE-ResNet or SE-Inception) universally improved their accuracy across the board.</li>
          <li><strong>Minimal Overhead:</strong> The SE block adds phenomenal predictive power while only increasing the total parameter count by about 10%, adding virtually zero spatial convolution compute time.</li>
        </ul>
      </section>

      <hr className="border-gray-300" />

      {/* Section 4 */}
      <section>
        <h3 className="text-2xl font-bold text-blue-800 mb-3">4. Conclusion and Critical Reflection</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          SENet successfully brought the concept of "Attention" (which was largely relegated to Natural Language Processing at the time) into the realm of pure Convolutional Networks. While highly effective, the fully connected layers inside the Excitation phase do add a slight latency overhead during inference. In modern systems, pure SE blocks have mostly been superseded by more advanced unified attention mechanisms, but the core principle of channel-wise recalibration remains fundamental.
        </p>
      </section>

      {/* References */}
      <section className="bg-gray-100 p-6 rounded-lg mt-8">
        <h3 className="text-xl font-bold text-gray-800 mb-3">References</h3>
        <ul className="list-decimal pl-6 text-sm text-gray-600 space-y-1">
          <li>Hu, J., Shen, L., & Sun, G. (2018). Squeeze-and-Excitation Networks. <em>CVPR</em>.</li>
          <li>RME 4221 Introduction to Machine Learning Presentation Assessment Rubric.</li>
        </ul>
      </section>
    </div>
  );
}