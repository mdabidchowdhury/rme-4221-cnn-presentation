import React from 'react';
import InteractiveBlock from '../shared/InteractiveBlock';

export default function T04_SqueezeNetView() {
  return (
    <div className="space-y-8 animate-fadeIn">
      <h2 className="text-3xl font-extrabold text-gray-900 border-b-2 border-gray-200 pb-2">
        T-04: SqueezeNet (AlexNet-level accuracy with 50x fewer parameters)
      </h2>

      {/* Section 1 */}
      <section>
        <h3 className="text-2xl font-bold text-blue-800 mb-3">1. Motivation and Context</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          By 2016, the deep learning community was hyper-focused on achieving the highest possible accuracy, often resulting in massive, unwieldy models. The creators of SqueezeNet asked a different question: <em>"Can we achieve the same accuracy as a baseline model (AlexNet) but with drastically fewer parameters?"</em> Smaller models require less communication overhead during distributed training, less bandwidth to export to autonomous vehicles or edge devices, and fit easily into the limited SRAM of FPGAs and embedded hardware.
        </p>
      </section>

      <hr className="border-gray-300" />

      {/* Section 2 */}
      <section>
        <h3 className="text-2xl font-bold text-blue-800 mb-3">2. Architecture Design</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          The core building block of SqueezeNet is the <strong>Fire Module</strong>. It consists of two distinct phases designed to drastically cut parameter counts:
          <br /><br />
          1. <strong>Squeeze Phase:</strong> A layer entirely composed of 1x1 convolutions. Its sole purpose is to compress the input channels into a smaller bottleneck. <br />
          2. <strong>Expand Phase:</strong> The squeezed tensor is passed into a mix of 1x1 and 3x3 convolutions to extract features, which are then concatenated.
          <br /><br />
          By replacing 3x3 filters with 1x1 filters wherever possible, and decreasing the number of input channels to 3x3 filters using the Squeeze phase, the parameter count drops exponentially.
        </p>
        
        {/* Simulating the Squeeze Phase */}
        <InteractiveBlock 
          title="Fire Module: Squeeze Phase (1x1 Convolution)" 
          defaultW={55} 
          defaultCin={128} 
          defaultK={1} 
          defaultS={1} 
          defaultP={0} 
          defaultCout={16} 
          revisionText="Here, the channels are SQUEEZED from 128 down to 16. Using a cheap 1x1 filter, the network intentionally creates a bottleneck to save massive amounts of memory and FLOPS before doing the heavy 3x3 expand phase."
        />
        <p className="text-sm text-gray-500 italic mt-2">
          * Notice how the 1x1 convolution acts as a channel-reduction tool. We take C<sub>in</sub> = 128 channels and "squeeze" them down to C<sub>out</sub> = 16 channels, maintaining the 55x55 spatial resolution. This 16-channel tensor is extremely cheap to process in the subsequent Expand phase!
        </p>
      </section>

      <hr className="border-gray-300" />

      {/* Section 3 */}
      <section>
        <h3 className="text-2xl font-bold text-blue-800 mb-3">3. Experimental Results and Impact</h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li><strong>Parameter Reduction:</strong> SqueezeNet achieved AlexNet-level accuracy on ImageNet with 50x fewer parameters (1.2 million vs. 60 million).</li>
          <li><strong>Deep Compression:</strong> When combined with network pruning and quantization techniques, SqueezeNet's size was compressed to under 0.5 Megabytes—small enough to fit entirely within the L1/L2 cache of a modern CPU.</li>
          <li><strong>Hardware Influence:</strong> It proved that architectural design (Fire modules) could be as effective as pure mathematical compression, heavily influencing the design of inference engines for embedded robotics.</li>
        </ul>
      </section>

      <hr className="border-gray-300" />

      {/* Section 4 */}
      <section>
        <h3 className="text-2xl font-bold text-blue-800 mb-3">4. Conclusion and Critical Reflection</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          While SqueezeNet was a breakthrough for model size, "small parameter count" does not always guarantee "fast inference time." The heavy use of concatenation and branching in Fire modules can create memory-access bottlenecks on certain hardware accelerators (like older GPUs). Later architectures, such as MobileNet, proved that depthwise separable convolutions were ultimately a more balanced approach for optimizing both model size <em>and</em> latency.
        </p>
      </section>

      {/* References */}
      <section className="bg-gray-100 p-6 rounded-lg mt-8">
        <h3 className="text-xl font-bold text-gray-800 mb-3">References</h3>
        <ul className="list-decimal pl-6 text-sm text-gray-600 space-y-1">
          <li>Iandola, F. N., et al. (2016). SqueezeNet: AlexNet-level accuracy with 50x fewer parameters and &lt;0.5MB model size. <em>arXiv preprint arXiv:1602.07360</em>.</li>
          <li>RME 4221 Introduction to Machine Learning Presentation Assessment Rubric.</li>
        </ul>
      </section>
    </div>
  );
}