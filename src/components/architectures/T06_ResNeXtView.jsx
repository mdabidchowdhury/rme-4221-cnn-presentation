import React from 'react';
import InteractiveBlock from '../shared/InteractiveBlock';

export default function T06_ResNeXtView() {
  return (
    <div className="space-y-8 animate-fadeIn">
      <h2 className="text-3xl font-extrabold text-gray-900 border-b-2 border-gray-200 pb-2">
        T-06: ResNeXt (Aggregated Residual Transformations)
      </h2>

      {/* Section 1 */}
      <section>
        <h3 className="text-2xl font-bold text-blue-800 mb-3">1. Motivation and Context</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          By 2017, architectures were typically scaled by increasing depth (more layers) or width (more channels). However, scaling these dimensions provides diminishing returns and rapidly increases the risk of overfitting. The Inception architecture showed that a "split-transform-merge" strategy (processing data through multiple parallel paths) was highly effective, but Inception modules were notoriously difficult to design, requiring fine-tuning of many hyperparameters for each individual block. ResNeXt was created to combine the straightforward repeatability of ResNet with the parallel processing power of Inception.
        </p>
      </section>

      <hr className="border-gray-300" />

      {/* Section 2 */}
      <section>
        <h3 className="text-2xl font-bold text-blue-800 mb-3">2. Architecture Design</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          The core innovation of ResNeXt is the introduction of a new scaling dimension called <strong>Cardinality</strong> (the size of the set of transformations). Instead of having one large convolution filter, ResNeXt splits the input channels into multiple smaller, identical groups. <br /><br />
          Using <strong>Grouped Convolutions</strong>, the network applies these parallel transformations and then adds the results together, combined with a standard ResNet skip connection. If Cardinality ($C$) is 32, the input channels are split into 32 distinct paths, processed independently, and merged.
        </p>
        
        {/* Simulating one path of a Grouped Convolution */}
        <InteractiveBlock 
          title="ResNeXt Grouped Convolution Path (Cardinality C=32)" 
          defaultW={56} 
          defaultCin={8} 
          defaultK={3} 
          defaultS={1} 
          defaultP={1} 
          defaultCout={8} 
          revisionText="Here, the channels are SPLIT. Instead of processing a massive 256-channel tensor all at once, ResNeXt splits it into 32 parallel paths of 8 channels each (Cardinality). It processes them independently, then merges them back together."
        />
        <p className="text-sm text-gray-500 italic mt-2">
          * Notice the input channels. If the total block input was 256 channels, a Cardinality of 32 means each parallel path only processes C<sub>in</sub> = 8 channels! The 32 separate outputs (each C<sub>out</sub> = 8) are then concatenated back together to reform the 256-channel tensor.
        </p>
      </section>

      <hr className="border-gray-300" />

      {/* Section 3 */}
      <section>
        <h3 className="text-2xl font-bold text-blue-800 mb-3">3. Experimental Results and Impact</h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li><strong>Superior Scaling:</strong> The authors mathematically proved and empirically demonstrated that increasing Cardinality is a more effective way of gaining accuracy than going deeper or wider.</li>
          <li><strong>Performance Benchmark:</strong> ResNeXt-101 achieved higher accuracy than ResNet-200 on ImageNet while maintaining the exact same computational complexity (FLOPS) as ResNet-101.</li>
          <li><strong>Standardization:</strong> Grouped convolutions became a standard tool in the deep learning arsenal, directly paving the way for architectures like ShuffleNet and ConvNeXt.</li>
          <li><strong>Numerical Example:</strong> Using a Cardinality of 32 (splitting 256 channels into 32 paths of 8) matches the exact computational complexity of ResNet-101 but reduces the top-1 error by roughly 1-2%.</li>
          <li><strong>Real-World Applications:</strong> Large-scale video classification and action recognition. The parallel transformation paths are highly efficient at capturing diverse temporal features in moving footage.</li>
        </ul>
      </section>

      <hr className="border-gray-300" />

      {/* Section 4 */}
      <section>
        <h3 className="text-2xl font-bold text-blue-800 mb-3">4. Conclusion and Critical Reflection</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          ResNeXt elegantly solved the complexity of designing parallel network topologies by making all parallel paths identical. However, the theoretical mathematical efficiency does not always translate perfectly to real-world hardware. In practice, heavily grouped convolutions can suffer from suboptimal memory access patterns on certain GPUs, meaning a ResNeXt model might take slightly longer to train per epoch than a standard ResNet, even if their theoretical FLOPS are identical.
        </p>
      </section>

      {/* References */}
      <section className="bg-gray-100 p-6 rounded-lg mt-8">
        <h3 className="text-xl font-bold text-gray-800 mb-3">References</h3>
        <ul className="list-decimal pl-6 text-sm text-gray-600 space-y-1">
          <li>Xie, S., Girshick, R., Dollár, P., Tu, Z., & He, K. (2017). Aggregated Residual Transformations for Deep Neural Networks. <em>CVPR</em>.</li>
          <li>RME 4221 Introduction to Machine Learning Presentation Assessment Rubric.</li>
        </ul>
      </section>
    </div>
  );
}