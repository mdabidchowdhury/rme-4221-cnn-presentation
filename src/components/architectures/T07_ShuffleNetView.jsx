import React from 'react';
import InteractiveBlock from '../shared/InteractiveBlock';

export default function T07_ShuffleNetView() {
  return (
    <div className="space-y-8 animate-fadeIn">
      <h2 className="text-3xl font-extrabold text-gray-900 border-b-2 border-gray-200 pb-2">
        T-07: ShuffleNet (Extremely Computation-Efficient CNN)
      </h2>

      {/* Section 1 */}
      <section>
        <h3 className="text-2xl font-bold text-blue-800 mb-3">1. Motivation and Context</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          While architectures like ResNeXt and MobileNet drastically reduced the cost of spatial convolutions (using grouped or depthwise convolutions), they inadvertently created a new bottleneck: the 1x1 "pointwise" convolutions used to combine features across channels. In small networks, these 1x1 convolutions can consume up to 93% of the total computational budget! If researchers applied grouping to the 1x1 convolutions to save time, the separate channel groups would stop talking to each other, crippling the network's ability to learn complex representations.
        </p>
      </section>

      <hr className="border-gray-300" />

      {/* Section 2 */}
      <section>
        <h3 className="text-2xl font-bold text-blue-800 mb-3">2. Architecture Design</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          To solve this lack of cross-group communication, the authors introduced the <strong>Channel Shuffle</strong> operation. 
          <br /><br />
          The architecture uses <strong>Pointwise Group Convolutions</strong> (1x1 grouped convolutions) to drastically reduce computational cost. Immediately after, a Channel Shuffle operation systematically rearranges the channels from the different groups. This ensures that the next group convolution receives input data from <em>all</em> previous groups, maintaining smooth information flow across the entire feature map without adding any mathematical multiplications.
        </p>
        
        {/* Simulating a 1x1 Group Conv inside ShuffleNet */}
        <InteractiveBlock 
          title="Pointwise Group Conv + Shuffle Stage" 
          defaultW={28} 
          defaultCin={48} 
          defaultK={1} 
          defaultS={1} 
          defaultP={0} 
          defaultCout={48} 
        />
        <p className="text-sm text-gray-500 italic mt-2">
          * Notice we are using a 1x1 Kernel here. In ShuffleNet, this C<sub>out</sub> = 48 tensor will have its memory addresses transposed and flattened (shuffled) before moving to the next layer. This channel reorganization requires zero FLOPS!
        </p>
      </section>

      <hr className="border-gray-300" />

      {/* Section 3 */}
      <section>
        <h3 className="text-2xl font-bold text-blue-800 mb-3">3. Experimental Results and Impact</h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li><strong>ARM Device Dominance:</strong> On ARM-based mobile devices, ShuffleNet achieved an actual inference speedup of up to 13x over AlexNet while maintaining comparable accuracy.</li>
          <li><strong>Outperforming Baselines:</strong> Under a strict computational budget of 40 MFLOPs, ShuffleNet outperformed MobileNetV1 by a significant 7.8% margin on ImageNet top-1 error.</li>
          <li><strong>Innovation in Routing:</strong> It proved that deterministic data-routing operations (like memory shuffling) could replace heavy mathematical operations for feature combination.</li>
        </ul>
      </section>

      <hr className="border-gray-300" />

      {/* Section 4 */}
      <section>
        <h3 className="text-2xl font-bold text-blue-800 mb-3">4. Conclusion and Critical Reflection</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          ShuffleNet is a masterclass in co-designing an architecture specifically for the constraints of mobile processors. However, memory manipulation operations like Channel Shuffling are not entirely "free." While they require zero mathematical multiplications (FLOPS), they rely heavily on memory bandwidth. On desktop GPUs optimized for massive, contiguous matrix multiplications, the fragmented memory access of Channel Shuffle can actually slow down training times compared to standard convolutions.
        </p>
      </section>

      {/* References */}
      <section className="bg-gray-100 p-6 rounded-lg mt-8">
        <h3 className="text-xl font-bold text-gray-800 mb-3">References</h3>
        <ul className="list-decimal pl-6 text-sm text-gray-600 space-y-1">
          <li>Zhang, X., Zhou, X., Lin, M., & Sun, J. (2018). ShuffleNet: An Extremely Computation-Efficient Convolutional Neural Network for Mobile Devices. <em>CVPR</em>.</li>
          <li>RME 4221 Introduction to Machine Learning Presentation Assessment Rubric.</li>
        </ul>
      </section>
    </div>
  );
}