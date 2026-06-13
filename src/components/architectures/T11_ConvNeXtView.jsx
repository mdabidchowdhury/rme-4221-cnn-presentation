import React from 'react';
import InteractiveBlock from '../shared/InteractiveBlock';

export default function T11_ConvNeXtView() {
  return (
    <div className="space-y-8 animate-fadeIn">
      <h2 className="text-3xl font-extrabold text-gray-900 border-b-2 border-gray-200 pb-2">
        T-11: ConvNeXt (A CNN for the 2020s)
      </h2>

      {/* Section 1 */}
      <section>
        <h3 className="text-2xl font-bold text-blue-800 mb-3">1. Motivation and Context</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          Starting in 2020, Vision Transformers (ViTs) like the Swin Transformer began absolutely dominating computer vision benchmarks, leading many to believe that pure Convolutional Neural Networks (CNNs) were obsolete. The creators of ConvNeXt hypothesized that the superiority of Transformers wasn't entirely due to their self-attention mechanisms, but rather because they were trained with highly modernized, optimized techniques. They asked: <em>If we apply all the structural tricks of a Vision Transformer to a standard ResNet, can it compete?</em>
        </p>
      </section>

      <hr className="border-gray-300" />

      {/* Section 2 */}
      <section>
        <h3 className="text-2xl font-bold text-blue-800 mb-3">2. Architecture Design</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          ConvNeXt starts with a standard ResNet-50 and systematically "modernizes" it step-by-step to mimic a Transformer:
          <br /><br />
          1. <strong>Macro Design:</strong> Adjusts the ratio of compute blocks to mimic the Swin Transformer (e.g., spending much more compute in the 3rd stage of the network).<br />
          2. <strong>Depthwise Convolutions:</strong> Uses depthwise convolutions extensively to mimic the weighted sum operation of self-attention.<br />
          3. <strong>Larger Kernels:</strong> Increases the standard 3x3 kernel size to a massive 7x7 kernel.<br />
          4. <strong>Micro Design:</strong> Replaces ReLU with GELU (Gaussian Error Linear Unit), reduces the number of activation functions overall, and swaps Batch Normalization for Layer Normalization.
        </p>
        
        {/* Simulating the Large Kernel Depthwise Conv */}
        <InteractiveBlock 
          title="ConvNeXt Modernized Block (Large 7x7 Kernel)" 
          defaultW={56} 
          defaultCin={128} 
          defaultK={7} 
          defaultS={1} 
          defaultP={3} 
          defaultCout={128} 
          revisionText="Here, channels stay at 128 during a massive 7x7 scan. By keeping the channels flat during the depthwise phase, ConvNeXt can afford the large 7x7 kernel required to mimic the 'global receptive field' of a Vision Transformer."
        />
        <p className="text-sm text-gray-500 italic mt-2">
          * Notice the unusually large 7x7 kernel (K=7). In traditional CNNs, this was considered too computationally expensive. But when paired with Depthwise Convolution, the 7x7 kernel becomes highly efficient and allows the CNN to mimic the large "global receptive field" of a Transformer!
        </p>
      </section>

      <hr className="border-gray-300" />

      {/* Section 3 */}
      <section>
        <h3 className="text-2xl font-bold text-blue-800 mb-3">3. Experimental Results and Impact</h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li><strong>Beating Transformers:</strong> ConvNeXt achieved an astonishing 87.8% top-1 accuracy on ImageNet, directly competing with or outperforming state-of-the-art Vision Transformers like Swin-B.</li>
          <li><strong>Simplicity:</strong> It achieved this without requiring the complex, memory-hungry self-attention mechanisms, proving pure convolutions are still highly viable.</li>
          <li><strong>Robustness:</strong> Showed better performance than Transformers on dense prediction tasks like object detection and semantic segmentation.</li>
        </ul>
      </section>

      <hr className="border-gray-300" />

      {/* Section 4 */}
      <section>
        <h3 className="text-2xl font-bold text-blue-800 mb-3">4. Conclusion and Critical Reflection</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          ConvNeXt is a brilliant defense of convolutional architectures. However, it heavily blurs the lines between what constitutes a CNN and what constitutes a Transformer. By the time ConvNeXt is fully modernized with LayerNorm, GELU, and inverted bottlenecks, the architectural philosophy is virtually identical to a Transformer, just using a spatial sliding window instead of matrix attention. It highlights that the <em>training recipe</em> is often just as important as the architecture itself.
        </p>
      </section>

      {/* References */}
      <section className="bg-gray-100 p-6 rounded-lg mt-8">
        <h3 className="text-xl font-bold text-gray-800 mb-3">References</h3>
        <ul className="list-decimal pl-6 text-sm text-gray-600 space-y-1">
          <li>Liu, Z., Mao, H., Wu, C. Y., Feichtenhofer, C., Darrell, T., & Xie, S. (2022). A ConvNet for the 2020s. <em>CVPR</em>.</li>
          <li>RME 4221 Introduction to Machine Learning Presentation Assessment Rubric.</li>
        </ul>
      </section>
    </div>
  );
}