## Page 1

Representational Emendation: Designing Cognitive Friction with Subtractive Fine-Tuning in Large Language Models

Martin Disley^{1}, Murad Khan^{2}

^{1}Institute for Design Informatics, University of Edinburgh; ^{2}Creative Computing Institute, University of the Arts London

## ABSTRACT

Large Language Models (LLMs) are increasingly deployed in tools-for-thought and creativity support systems, yet their generative fluency can collapse early-stage ideation into selection and curation, shifting cognitive labour away from concept formation and divergent thinking toward homogenised outputs. We introduce representation unlearning as a subtractive approach to induce cognitive friction, treating the learned conceptual manifold of a pre-trained model as a design surface for human–AI interaction. We operationalise this with Unlearning to Rest, a prototype that applies weight-level concept suppression to Llama3.2:3b, suppressing a canonical attractor concept (“chair”) to create stable navigational impediments—productive representational absences that resist premature convergence. We evaluate the approach in a within-subject study (N=37) where participants generate “radically new chair” concepts. Quantitative results show a consistent workload–ownership trade-off: the unmodified model reduces mental demand and effort but also reduces perceived ownership, while Unlearning to Rest yields ratings closer to unaided ideation. Qualitative analysis indicates that the constrained model prompts user re-articulation, supporting a stage-fit workflow in which constrained assistance benefits early ideation. We contribute (1) representational emendation as a lens for LLM-based tools-for-thought, (2) a system instantiation via weight-level concept suppression, and (3) empirical evidence motivating stage-sensitive evaluation of LLM assistance beyond efficiency and output quality.

##

---

## Page 2

2

# CONTENTS

1. INTRODUCTION
1.1. Defining cognitive friction

2. BACKGROUND
2.1. Fixation
2.2. Homogeneity
2.3. Tools for Thought and Creativity Support

3. REPRESENTATIONAL EMENDATION
3.1. The Structure of Conceptual Space
3.2. Anthropomorphism
3.3. Intercepted Self
3.4. Unlearning

4. UNLEARNING TO REST
4.1. Unlearning Algorithm
4.2. Unlearning Design Rationale
4.3. Unlearning to Rest
4.4. Pilot Study in Creative Practice: The Ear Rest

5. EVALUATION METHODS
5.1. Study Design
5.2. Participants
5.3. Ideation Task
5.3.1 Prompt Formatting
5.4. Questionnaires
5.5. Study Platform
5.6. Workload and Ownership Analysis
5.7. Open Text and Transcript Coding

6. EVALUATION RESULTS
6.1. Questionnaire Results
6.2. Coding of Qualitative Data
6.3. Thematic Analysis
6.4. Activity Outputs
6.4.1 Reflections on Outputs

7. DISCUSSION
7.1. Key Findings
7.2. Interpreting Workload-Ownership Trade-Off
7.3. Toward Stage-Fit LLM Assistance
7.4. Relation to Fixation and Homogenisation Literature

---

## Page 3

7.5 Representation as a Design Surface
7.6 Implications
7.7 Speculative implementation
7.8 Limitations
7.9 Further Work
8. Conclusion

## 1 Introduction

The integration of Generative Artificial Intelligence (GenAI) into cognitive workflows has precipitated a fundamental shift in the underlying assumptions of tool design. Historically, the ”Tools for Thought” paradigm—from Engelbart’s augmentation *(Engelbart, 1962)* and Lidlickers vision of *man–computer symbiosis* *(Licklider, 1960)* to computer-aided design environments such as parametric CAD platforms and collaborative interface design tools—has predicated human-computer interaction on the minimisation of friction and the execution of human intent. In this lineage, a tool is successful if it reduces the cognitive load required to translate an internal representation, or intention, into an external artifact, functioning as a cognitive partner rather than a replacement for human judgment.

Recently, Large Language Models (LLMs) have introduced a rupture into this model by collapsing the distance between intention, articulation, and execution. The novel capacity of computational systems to generate high-fidelity artifacts from minimal natural language prompts risks transitioning us from instruments that organise and augment intent through iterative articulation, to those which substitute and execute upon it. In these contexts, conversational GenAI reduces cognitive effort by supplying content, structure and goal direction that users would otherwise have to produce for themselves. Whilst users may find this valuable in certain tasks, particularly where the goal is throughput or specification, we suggest that the ensuing shift in the locus of cognition obscures the boundary between support for thinking and substitution of it. Rather than supporting users to articulate and test their own concepts, fluent systems can encourage delegation—users select, edit, and curate model outputs, shifting effort from concept formation toward evaluation and acceptance. Though Hutchins’ theory of distributed cognition convincingly accounts for more distal and material forms of cognitive prostheses *(Hutchins, 1995)*, we contend that the paradigm created by LLMs introduces a qualitatively different form of delegation, motivating a deeper, more urgent distinction between tooling assistance that (1) primarily *offloads* cognitive labour (supporting speed and detailing, but potentially reducing ownership and critical engagement), and (2) assistance that *scaffolds* cognition by structuring productive constraints and prompts for re-articulation (supporting re-framing and agency, even when it increases effort).

### 1.1 Defining cognitive friction

Given this, we propose that increasing cognitive friction within co-creative and co-ideational interaction with LLMs will resituate their use, and value, towards being scaffolds rather than replace

---

## Page 4

ments for human cognition. Cognitive friction refers to interactional features that resist fluent resolution, requiring users to re-articulate assumptions, explore alternatives, or confront gaps in understanding *(Bjork, Bjork, et al., 2011)*.

Importantly, this friction does not arise from making systems less capable, but from shaping when and how capabilities are deployed. We take as a primary material the representational architecture of LLMs, focusing on the ways in which mutating their internal conceptual spaces can enable productive forms of cognitive friction in conversational scenarios. Concepts can be selectively removed, associations weakened, or dominant trajectories disrupted, creating productive absences that provoke defamiliarisation and force re-conceptualisation in the user*(Cox, Gould, Cecchinato, Iacovides, & Renfree, 2016)*.

Taken together, these arguments reposition fluency not as an unqualified virtue in LLM-based tools-for-thought, but as a design variable whose effects depend on how it redistributes cognitive labour. Although LLMs excel at producing coherent artifacts with minimal input, this capacity can collapse key phases of conceptual work, shifting users from sense-making toward selection and acceptance. We argue that counteracting this tendency requires interactional designs that deliberately introduce cognitive friction, compelling re-articulation and sustained engagement rather than passive delegation. Importantly, such friction need not arise from limiting system capability, but from intervening at the representational layer to shape when and how generative power is expressed. Viewed in this way, effective GenAI tools must be evaluated not only by output quality or efficiency, but by how well their forms of assistance fit the stage and demands of the user’s cognitive process.

We investigate how LLM assistance redistributes cognitive labour during early-stage design ideation, focusing on the trade-off between reduced workload and diminished perceived ownership. We introduce representational emendation and instantiate it in Unlearning to Rest, a co-ideation prototype built on a weight-level concept suppression intervention that removes a canonical attractor (“chair”) from a Llama3.2:3b model to introduce stable cognitive friction. We evaluate this approach in a within-subject study comparing unaided ideation, an unmodified model, and our ablated model, reporting workload/ownership measures and qualitative analyses that motivate a stage-fit account of LLM assistance. On this basis, we articulate three contributions.

C1 (Conceptual): We propose an exploration of conceptual spaces within LLMs as a strategy for re-framing approaches to ’assistance’ in tools-for-thought. We situated forms of friction produced by manipulating the representational manifold of a model constitute a primary mechanism for sustaining human conceptual revision.

C2 (System): We operationalise our theory through a weight-level unlearning intervention that selectively suppresses dominant conceptual trajectories in a language model, prototyping this approach in *Unlearning to Rest*, an ablated variant of the Llama-3.2:3b model, where the concept of ’chair’ has been suppressed.

C3 (Empirical): We empirically characterise how different forms of LLM assistance redistribute cognitive labour, revealing workload–ownership trade-offs and motivating a stage-fit model of generative roles in ideation.

---

## Page 5

## 2 Background

### 2.1 Fixation

Design fixation is among the most well researched cognitive challenges that obstruct designers *(Crilly & Cardoso, 2017; Purcell, Gero, Edwards, & Matka, 1994)*, with fixation reliably biasing the traversal of a design space towards certain existing, canonical design patterns *(Jansson & Smith, 1991)*. Previous research shows that ideas are then carried forward into the design solutions, resulting in unoriginal outputs *(Jansson & Smith, 1991)*, irrespective of whether designers are expert or novice *(Linsey et al., 2010; Viswanathan & Linsey, 2013)*. Whilst nominally a factor hindering creative professionals, fixation affects individuals in creative problem solving tasks across disciplines *(Vasconcelos, Neroni, Cardoso, & Crilly, 2018)*, including cognitive science *(Cao, Zhao, & Guo, 2021)*, education *(Howard, Maier, Onarheim, & Friis-Olivarius, 2013)*, engineering *(Viswanathan & Linsey, 2012)* *(Youmans, 2011; Viswanathan & Linsey, 2013)*, and psychology *(Bellows, Higgins, Smith, & Youmans, 2012; M. A. B. Smith, Youmans, Bellows, & Peterson, 2013)*.

Design fixation comes in three forms *(Youmans & Arciszewski, 2014b)*: (1) unconscious adherence to pre-existing ideas, copying features, either appropriate or inappropriate for the task or brief, from canonical examples*(Crilly & Cardoso, 2017; Jansson & Smith, 1991)*; (2) conscious blocking: dismissing or actively avoiding new ideas due to path dependency or a conscious commitment to project’s direction; (3) intentional resistance: also known as local search bias *(Rosenkopf & Nerkar, 2001)*, a deliberate decision against pursuing novel or alternative approaches or concepts in favour of established ones.

An unconscious adherence to pre-existing ideas can be distinguished from the other two kinds of causes of fixation in this taxonomy. In the case of both ‘conscious blocking’ and ‘intentional resistance’, the practitioner is aware of alternative paths, or at least aware of other areas of the search space they might illuminate, but actively chooses not to pursue them. The root of the impediment resulting in the fixation in these cases is social, organisational, ideological, or perhaps even in some cases strategic, but could not be described as cognitive.

Fixation is not only shaped by *what* examples are encountered, but *when* they are encountered *(Kulkarni, Dow, & Klemmer, 2014)*. Cognitive accounts of idea generation emphasise that creative ideation unfolds as a time-extended search process in which attention and memory are progressively biased toward accessible cues and partial solutions *(Nijstad & Stroebe, 2006)*. In this view, early examples can act as powerful anchors, steering subsequent exploration and increasing the likelihood of converging prematurely on a limited region of the design space. Kohn and Smith’s notion of “collaborative fixation” extends this further, suggesting that exposure to others’ ideas during early brainstorming reduces diversity and increase fixation, effectively narrowing the exploration of alternatives as the session progresses *(Kohn & Smith, 2011)*.

In the context of educational cognition, “invent-first” proposals suggest that learners benefit from attempting to construct understanding on their own before being presented with canonical solutions or examples. Schwartz and Martin characterise this as “inventing to prepare for future learning,” *(Schwartz & Martin, 2004)*, where initial struggle can improve later learning and transfer. This is compounded by Schwartz et al. further findings that “telling first” can reduce the benefits of contrasting cases *(Schwartz, Chase, Oppezzo, & Chin, 2011)*.

From the perspective of creativity support, this implies that the *timing* of example provision is a design variable: under some conditions early or repeated exposure to examples may improve

---

## Page 6

creative work, while in others it may induce fixation or disrupt the cognitive flow of ideation *(Kulkarni et al., 2014; Siangliulue et al., 2015; Nijstad and Stroebe, 2006)*. This temporal framing is increasingly relevant for generative systems, which can provide high-fidelity examples instantly and at scale, and therefore risk entering the workflow at the moment when ideation is most sensitive to premature closure.

Researchers have explored various strategies to overcome design fixation *(Vasconcelos and Crilly, 2016)* including integrating brief “incubation periods” into a task *(S. M. Smith and Linsey, 2011)* *(Youmans, 2011)*, prompting participants with regular reminders to consider all available options *(Youmans and Arciszewski, 2014a)*, leveraging design thinking and lateral thinking methods *(Belski and Belski, 2015)* such as de Bono’s six thinking hats *(Andersson et al., 2012)* and incorporating physical prototyping in ideation activities *(Viswanathan and Linsey, 2012)*. Temporal accounts add a complementary mitigation strategy: aligning the introduction of examples and assistance carefully during ideation, to preserve early exploration and reduce premature convergence.

### 2.2 Homogeneity

While fixation research has primarily examined how individuals or groups converge prematurely during ideation, recent work on GenAI reveals a complementary phenomenon operating at the population level. When LLMs are introduced as co-creative partners, convergence is no longer confined to a single design process but emerges across users, tasks, and cultural contexts, producing systematic homogenisation of outputs.

The fundamental tendency of LLMs to produce homogeneous outputs has emerged as a critical limitation in their application to creative and ideation tasks. Doshi and Hauser demonstrated that while GenAI enhances individual creativity metrics, it simultaneously reduces the diversity of novel content across users, with AI-enabled stories showing significantly higher similarity to each other than human-generated stories *(Doshi and Hauser, 2024)*. Argwal et al found that AI suggestions led users from non-Western backgrounds to adopt Western writing styles, diminishing cultural nuances and altering not just what is written but fundamentally how it is expressed *(Agarwal et al., 2025)*. More generally, Padmakumar et al showed that co-writing with feedback-tuned models like InstructGPT resulted in statistically significant reductions in lexical and content diversity, with the model contributing increasingly homogeneous text to collaborative outputs *(Padmakumar and He, 2024)*. Furthermore, while Lee and Chung found that ChatGPT enhanced average creativity scores in brainstorming tasks *(B. C. Lee and Chung, 2024)*, Meincke et al reanalysed the same data to reveal the same critical trade-off found by Doshi and Hauser *(Doshi and Hauser, 2024)*, that although individual ideas improved, the diversity of the collective idea pool decreased dramatically *(Meincke et al., 2025)*.

Multiple studies have identified specific mechanisms driving this convergence, and attempts to test the capacity of LLMs for unpredictable outputs are particularly revealing. Zhang et al find that LLMs, instruction tuned models in particular, prove to be very poor at random sampling *(Y. Zhang et al., 2024)*, a capacity considered fundamental to earlier generations of creative algorithms. Arnold et al demonstrated that even simpler probabilistic predictive text systems encourage predictable writing *(Arnold et al., 2020)* and Anderson et al found that ChatGPT users produced less semantically distinct ideas compared to alternative creativity support tools *(Anderson et al., 2024b)*.

##

---

## Page 7

As homogenisation has become a recognised risk, researchers have proposed frameworks for understanding and measuring this phenomenon. Anderson et al *(Anderson, Shah, & Kreminski, 2024a)* introduced homogenisation analysis as an evaluation criterion for creativity support tools, using semantic similarity metrics to quantify convergence. Kreminski et al *(Kreminski, Karth, Mateas, & Wardrip-Fruin, 2022)* developed expressive range coverage analysis to examine whether users explore the full creative potential of AI systems or converge on typical outputs. Castro et al *(Castro, Gao, & Martin, 2023)* presented a Bayesian framework showing how individual-level decisions about AI interaction can lead to societal-level homogenisation, particularly when models are trained on their own outputs.

The cognitive and behavioural impacts of this homogenisation extend beyond immediate outputs. Jakesch et al *(Jakesch, Bhat, Buschek, Zalmanson, & Naaman, 2023)* found that language models not only affect what users write but also shift their subsequent attitudes and opinions. Bhat et al *(Bhat et al., 2023)* documented how AI suggestions alter writers’ cognitive processes and planning strategies. The homogenisation effect appears particularly pronounced in professional contexts, where Del Aqua et al found that AI assistance led to convergence in solution approaches across different functional backgrounds, effectively eliminating diverse perspectives *(Dell’Acqua et al., 2023, 2025)*.

Attempts to mitigate homogenisation have shown limited success. Meincke et al *(Meincke, Mollick, & Terwiesch, 2024)* found that while prompt engineering techniques like Chain-of-Thought can improve idea diversity, AI-generated tools still fall short of human-level diversity. Sarkar argues that this ”mechanised convergence” is not merely a technical limitation but reflects fundamental properties of how GenAI mediates human intention, suggesting that the homogenisation problem may be inherent to current LLM architectures. *(Sarkar, 2024)*.

The growing body of research on mechanised convergence and temporal accounts of fixation suggest that the limitations of LLMs in creative ideation are not a consequence of insufficient capability, but of misaligned assistance. While fluent generation can be valuable in later stages of work—such as elaboration, specification, or documentation—it risks disrupting early-stage ideation, where exploration, uncertainty, and representational plurality are critical. This distinction motivates a stage-sensitive account of LLM assistance, in which generative fluency must be deliberately constrained or reshaped during ideation to preserve diversity, agency, and conceptual ownership.

Taken together, fixation and premature convergence can be understood as a progressive narrowing of the representational space explored during ideation. While traditional accounts frame this narrowing as a within-user or within-session phenomenon, generative systems introduce the possibility that such narrowing is externalised, amplified, and standardised across users. This motivates a shift from viewing fixation solely as a cognitive bias to viewing it as a systemic property of generative assistance.

### 2.3 Tools for Thought and Creativity Support

As ”one of the grand challenges for HCI” *(Shneiderman, 2009)* researchers have explored the design and evaluation of computational tools to aid creativity for the last thirty years *(Fischer, 2004)*. The outputs of this work, creativity support tools (CSTs), comprise a set of technologies that enable users to ”explore, discover, imagine, innovate, compose, and collaborate” *(Shneiderman, 2002; Andolina et al., 2017; Zheng, Do, & Budd, 2017)*.

---

## Page 8

Motivated by the rise of LLMs, researchers within HCI have begun to utilise GenAI as a mechanism to develop tools to mitigate fixation across a variety of domains, including: human-robot interaction design *(Hoggenmueller, Lupetti, van der Maden, & Grace, 2023)*, automobile design *(Chen et al., 2024)* and collaborative ideation *(Andolina et al., 2017; He et al., 2024; Lucas & Martinho, 2017; Karimi, Rezwana, Siddiqui, Maher, & Dehbozorgi, 2020)*. Despite promising advances, challenges persist, with the influence of interaction paradigms on user expectations *(Tholander & Jonsson, 2023)* and the high dismissal rate of AI-generated conversational cues causing problems for sustained use. *(Rayan et al., 2024)* Projects such as Luminate and BI-CST have attempted to overcome these limitations by structuring idea generation processes and using behaviourally informed techniques to challenge initial concepts and prevent premature closure *(Suh, Chen, Min, Li, & Xia, 2024; Yoo & Joo, 2024)*. These solutions have found some success, with studies showing that designers perceive GenAI tools as more efficient than traditional brainstorming methods *(Akverdi & Baykal, 2024; Shaer, Cooper, Mokryn, Kun, & Ben Shoshan, 2024)*.

These exemplar CSTs provide assistance for the conceptual demands of a creative practice or workflow (though there’s no clear distinction between ”thinking” and ”doing” in contemporary accounts of creative practice), therefore also fall under the broader HCI concern of “tools for thought”. Although contemporary usage often narrows this label to software, the underlying claim is broader: cognition is shaped by the practices and artifacts through which it is expressed and worked on *(Appleton, 2023)*. In HCI, tools-for-thought has therefore typically emphasised augmentation and partnership: tools help people externalise, reorganise, and iterate on thought (e.g., through annotation, juxtaposition, and revision), rather than simply accelerating task completion.

Design work in this space has therefore explored protective interaction strategies that deliberately shape users’ cognitive stance. Cheung’s concept of artificial ignorance speaks directly to this, arguing that GenAI is often framed as an authoritative “answer machine” that can become “less about enhancing thought than replacing it.” As an alternative, Cheung proposes the “ignorant co-learner”: an AI deliberately designed to relinquish epistemic authority and instead cultivate epistemic friction: “moments of uncertainty, dissonance, or pause” that prompt critical and reflexive thinking *(Cheung, 2025)*. Cheung emphasises that the goal is not to make systems unhelpful, but to “flatten epistemic hierarchies” by surfacing uncertainty, offering multiple perspectives, and deferring judgment to the user. The paper operationalises this stance through principles such as “Plurality over Precision” and “Adjustable Friction,” which position the timing and degree of epistemic friction as a design parameter rather than a usability defect *(Cheung, 2025)*.

In response to these challenges, Tankelevitch et al. synthesise a range of “challenge-oriented” metaphors—provocateur, antagonist, coach—and discuss deliberately “artificially ignorant” systems that foster moments of uncertainty, dissonance, or pause that foster moments compelling users to think critically and reflexively *(Tankelevitch et al., 2025)*. Such interventions align with a broader family of “cognitive forcing functions,” which seek to reduce over-reliance by structuring the interaction so that users must articulate intent and engage in verification rather than passively accept fluent completions *(H.-P. H. Lee et al., 2025)*.

In parallel, design theory has argued that GenAI should be understood as a technology that shapes cognition rather than merely generating outputs. Dalsgaard frames GenAI as an instrument of inquiry that both enables and constrains designers’ thinking, offering a vocabulary for how systems shape creative cognition across perception, conception, externalisation, knowing-through-action, and mediation *(Peter Dalsgaard, 2025)*. This perspective provides a complementary analytic lens for tools for thought: systems can be assessed by how they structure inquiry and

---

## Page 9

problem framing, not only by the speed or fidelity of produced artefacts.

While prior creativity support tools, or analysis such as Cheung’s primarily introduce friction through interactional prompts, role metaphors, or conversational challenges, they typically leave the underlying generative representations intact. This leaves open the question of whether cognitive stances can be shaped not only through interface design, but through direct intervention in the representational substrate of generative systems themselves.

## 3. REPRESENTATIONAL EMENDATION

### 3.1. The Structure of Conceptual Space

We draw on Peter Gärdenfors’ theory of conceptual spaces as a normative account of conceptual spaces in human cognition with its overview of interpretable quality dimensions, convexity and strategies for generalisation serving as a vocabulary for reasoning about how conceptual organisation supports—or undermines—human sense-making during ideation. Gärdenfors’ conceptual spaces function as a diagnostic geometry: not because LLMs implement them, but because departures from properties such as dimensional alignment, metric stability and convex neighbourhood structure predict specific conceptual reasoning failures that we believe might be able to exploit. Interactional consequences of these deviations such as premature convergence, over-reliance on fluent completions, and reduced re-framing of work by users, can be characterised as failures to sustain exploratory traversal of a concept space.

While LLM representations do not form clean convex regions aligned with interpretable dimensions, evidence suggests that they nonetheless exhibit local geometric regularities whose structure shapes probabilistic traversal during generation. Concepts are represented as vectors within a high-dimensional space, where meaning is polysemantically distributed across neurons rather than aligned with distinct perceptual axes. Research into the geometry of these embeddings suggests they form manifolds—curved, lower-dimensional surfaces embedded within the high-dimensional space which approximates local convexity *(Modell et al., 2025)* but possesses a global structure which is often non-linear and entangled. *(Kumar et al., 2025)* When we describe a model as having ”learned” a concept, it has not simply carved out a convex region; it has learned a complex probability distribution over a representational space where ”meaning” is derived from proximity and direction. *(Modell et al., 2025)* Despite this distinction, recent research suggests a correlation between the ”convexity” of disentangled semantic representations and their alignment with human categories. *(Fel et al., 2025)*

In this paper, the value of the conceptual spaces lens is therefore pragmatic, supporting design reasoning about how representational properties of generative models (such as dimensional interpretability, metric stability, and attractor dynamics) can be manipulated to effective redistribute cognitive labour between user and system through friction.

Under this frame, design fixation can be defined as as premature convergence on a high-density region of a learned conceptual manifold. When a prompt probes a canonical examples (e.g., ”a chair”), these activate common pathways through conceptual space—regions where repeated exposure to training data has created steep probability gradients that channel ideation toward familiar solutions. Once attention mechanisms focuses on ”chair” tokens, they will funnel to highly probably regions of conceptual space, in which local similarity structures will bias exploration toward chair-adjacent concepts (tables, benches, stools) rather than enabling traversal to more dis

---

## Page 10

tant regions (hammocks, leaning posts, body-conforming surfaces). If fixation is the over-traversal of dense canonical attractor regions, then effective tools for thought must intervene at the level of this representational topology, not merely at the level of prompts or interaction pacing.

This creates a specific design opportunity for LLM-based ideation tools. While human conceptual spaces are stabilised and inhibited by habituated neural pathways and years of sensorimotor experience, the representational manifold of LLMs are mathematically mutable. This means we can can intervene directly in the model’s geometry to introduce *designed absences* and altered neighbourhood structures: de-ranking dominant concepts, weakening associations, or disrupting trajectories that otherwise attract generation toward canonical solutions or conceptual fixations.

Recent work by Modell et al. lends weight to the claim that LLM representations form lower-dimensional manifolds where cosine similarity often correlates with intrinsic geodesic distance, suggesting a structural homology with Gärdenfors’ metric spaces *(Modell et al., 2025)*. When a user prompts an LLM with ”design a chair,” the model navigates the manifold along the geodesic path to the region of highest probability density (akin to Gärdenfors ’prototype’). Unlike the disentangled quality dimensions of human perception, LLM representations are often polysemantic and entangled. Kumar et al. describe this phenomenon as Fractured Entangled Representation (FER), where unitary concepts are distributed across disjointed, non-linear regions of the parameter space rather than forming single, clean convex sets *(Kumar et al., 2025)*. Despite this entanglement, the Minkowski Representation Hypothesis (MRH) proposed by Fel et al. *(Fel et al., 2025)* argues that the internal activations of multi-head attention models like DINOv2 and Llama produce outputs that can be mathematically characterised as Minkowski sums of convex polytopes, effectively constructing concepts as convex mixtures of archetypal landmarks *(Fel et al., 2025)*. Transformers thus harbour a functional tendency produce outputs that lie within the convex hull of their training data’s archetypes. These tendencies do not imply that non-convex or divergent outputs are impossible, but they help to explain why fluent generation so often yields normative or homogeneous outputs and why interventions that reshape representational topology may be a more direct lever than interaction-layer prompting alone.

### 3.2 Anthropomorphism

If the divergence between human conceptual spaces and LLM manifolds were merely internal, it might remain largely irrelevant to interaction. However, conversational interfaces systematically invite users to treat LLMs as dialogic agents. This effect is not accidental: turn-taking, natural language fluency, and responsiveness activate deeply ingrained social and cognitive heuristics, and recent HCI and NLP work increasingly frames anthropomorphism as a deliberate design strategy that can leverage these features of our psychology *(Xiao et al., 2025)*.

Equipped with human-like personas, emotional expressiveness, and social reasoning capabilities, LLMs present a sufficiently convincing veneer to foster user trust and fluid collaboration. However, LLMs are not reciprocal reasoners; they generate context-conditioned continuations over fixed learned representations, outputted as human readable language. This mismatch creates sequential (false) affordances, with one perceived capability (natural conversation) implying others that are either weakly instantiated or wholly absent (understanding, intentionality, ethical judgement). *(Ionescu, 2023)* *(Gaver, 1996)* ( [Gaver, 1991])Users thus perceive GenAI models as wholly realised conversational partners, even when the system cannot sustain the normative obligations of dialogue it participates within.

---

## Page 11

Ionescu characterises anthropomorphism as emerging from the dynamic between concept (humanlike design framings) and percept (users’ interpretive attributions), arguing that the locus of interaction is continuously constituted in this relation rather than determined by either side alone. *(Ionescu, 2023)*

Thus, while LLMs can simulate the form of dialogue, it is important to note that the absence of a shared conceptual economy can produce an emergent form of cognitive dissonance in which interaction feels faithfully dialogic, yet the responsibility of conceptual revision is increasingly displaced away from the user.

Indeed, GenAI is said to function as a surrogate knower, collapsing justification norms that typically govern knowledge claims *(Jose et al., 2025)*. The automation bias—over-trusting fluent algorithmic output—is exacerbated by anthropomorphic features (empathy, warmth) that trigger peripheral-route processing, bypassing critical evaluation. Together, these findings suggest that anthropomorphic fluency does not only influence trust, instead it actively reshapes epistemic behaviour by reducing the likelihood that users will interrogate, revise, or resist generative outputs.

Taking anthropomorphism as an interactional heuristic thus facilitates a more nuanced exploration of how mutating an LLM’s representational space can become a strategy for reducing cognitive effort in interaction. Treating anthropomorphism as a predictable interaction heuristic emerging from the tension between concept and percept enables an approach to LLMs focused on redirecting users through cognitive friction, reintroducing uncertainty and moments of re-articulation in order to preserve the user’s capacity for conceptual revision.

### 3.3 Intercepted Self

This heuristic has second-order effects, with LLM’s producing ’intercepted’ selves *(Schiller et al., 2025)*, an interactional state in which representational steering occurs below the threshold of reflective awareness due to anthropomorphic dialogue and fluent completion, causing users to experience a diminishing sense of agency and effort. This interception is a form of ”technological mediation” that is often transparent to the user, as well as tacitly accepted. An invisible influence of adaptive choice architectures provides the user with the affective ’feel’ of autonomy, whilst the model’s underlying training data and alignment protocols subtly steer their cognitive trajectory. In the context of creativity support tools (CSTs), this mediation can manifest as a restriction of the search space, guiding the user toward statistically probable—and therefore often normative—solutions. When a GenAI system provides lengthy, plausible and coherent answers instantly, the user is disincentivised from dispensing the cognitive effort required to parse through the assumptions in the response, leading to a progressive level of cognitive debt owed to the model as the conversation unfolds. Recent work in postphenomenology extends this analysis to digital technologies, arguing that computational systems actively mediate human intentions, transforming the space of what is both thinkable and doable. *(Verbeek, 2015)*

Interception also creates temporal compression in the ideation loop: processes that might normally unfold over hours or days of sketching, prototyping, and reflection can now occur in seconds. The acceleration of ideation timescales through GenAI disrupts consolidation processes foundational to creative learning. While short-term synaptic consolidation occurs within hours, systems consolidation—the reorganization of knowledge for flexible application—unfolds over days and requires offline processing through sleep and mental replay *(Huber et al., 2004)*. Design fixation research demonstrates that incubation periods, during

---

## Page 12

which ideators step back from active problem-solving, improve creative divergence by allowing unconscious restructuring of problem representations*(S. M. Smith & Linsey, 2011)*. Rapid, fluent LLM responses compress this incubation window, collapsing ideation into instantaneous cycles, with anthropomorphic dialogue amplifying this effect by prematurely signalling epistemic completion, exploiting our existing heuristics for correctness*(Sundar, 2008)*. When an LLM generates a detailed design proposal in response to a brief prompt, the cognitive work of gradually refining an idea through successive approximations is bypassed. By contrast, constrained models that require extended dialogue and tolerate failure inadvertently restore temporal pacing conducive to deeper conceptual consolidation. This cognitive friction serves as both a form of epistemic discipline as well as a temporal intervention, preserving the generative pause necessary for creative reorganisation. Temporal compression is not just about speed; it is about premature commitment to high-density regions of representational space, before the user has formed a differentiated conceptual query or understanding.

### 3.4 Unlearning

In the context of tools for thought, the challenge is therefore not simply how to control model outputs, but how to reshape representational dynamics in ways that redistribute cognitive labour back to the user, avoiding forms of temporal compression and cognitive interception in favour of exploiting existing interaction heuristics and model capabilities. For this, we propose the use of machine unlearning as a mechanism through which model representations can be augmented, and interactional dynamics amended to facilitate productive forms of cognitive friction.

’Machine unlearning’ has come to denote a field of optimisation approaches that target statistical learning models to remove specific information or suppress particular outputs being presented by a model to end users at inference time *(Nguyen et al., 2024)*. Colloquially termed ’digital forgetting’ *(Blanco-Justicia et al., 2025)*, unlearning for generative models has largely been motivated by the need to respond to removal requests for compliance with judicial demands around privacy *(D. Zhang et al., 2024)*, copyright *(Nguyen et al., 2024)* and ’safety’ concerns such as the removal of NSFW imagery *(Cooper et al., 2024)*. Due to the large-scale data ingestion and training process of highly-parameterised LLMs, retraining on an alternative dataset without these samples would incur high financial and environmental costs *(Patterson et al., 2021)*. As a result, much of the work on unlearning for GenAI reflects post-training techniques, designed to selectively cultivate a restricted range of outputs from a generative model without incurring the costs of (re)training, whilst seeking to retain the overall accuracy of the model when prompted *(Ali, Muhammad, Adnan, Alkhalifah, & Aslam, 2025)*.

Though unlearning may typically be understood (and evaluated) as a response to the difficulties of retraining, we instead suggest that creative practice requires leveraging unlearning as a stimulus. Additive approaches to fine-tuning build new correspondences to some other known pattern *(Jia et al., 2022; Wang et al., 2022)* whilst subtractive approaches steer model outputs through exclusion, often reshaping conceptual associations in non-linear and unpredictable ways. This approach aligns with findings on productive constraints in creativity and design research which demonstrates that strategic limitations can enhance creative output by forcing exploration of otherwise unconceived regions of the design space *(Feiten, Peck, Holland, & Chemero, 2023; Rosso, 2014)*. In our framework, we hypothesise that unlearning representations will create ”navigational impediments”- deliberate obstacles that prevent automatic convergence on familiar solu

---

## Page 13

tions – functioning as conduits for innovative and incongruent suggestions that can contribute to breaking patterns of fixation. In interaction, these impediments manifest as increased need for re-articulation, delayed convergence, and sustained engagement with alternative conceptual framings.

Whilst there are a variety of approaches that have been developed to respond to unlearning tasks *(Nguyen et al., 2024; Feng et al., 2025; Huang et al., 2024; Huang et al., 2025)*, our focus on model output situates unlearning methods within the wider domain of model steering *(Xie et al., 2025)*.

Though some attempt to steer through prompting alone *(Miehling et al., 2025)*, unlearning could be conceived of as a subclass of steering problems focused upon data removal and suppression *(Lu et al., 2025; Xie et al., 2025)*. Contrary to additive fine-tuning approaches such as prompt engineering (which denotes natural language guidance such as exemplar data or stylistic conditions that curate outputs through few-shot learning interactions with foundation models), or prompt-tuning *(Wang et al., 2022; Jia et al., 2022)* which deploys soft prompts (learnable parameters in the form of vector embeddings that are prepended to the user’s hard prompt), unlearning is a form of cost-effective *subtractive* fine-tuning, structured around the removal of target knowledge from a model. Subtractive approaches typically distinguish between ‘exact’ unlearning-aiming to completely remove the influence of targeted data points from the model through algorithmic-level retraining - and ‘approximate’ unlearning, which modifies the parameters of a trained model to reduce the influence of deleted data instances *(Guo et al., 2019; Guo et al., 2023; Z. Liu et al., 2024)*.

While legal concerns exist regarding suppression versus removal *(Cooper et al., 2024)*, we focus on approximate unlearning through concept suppression *(Eldan and Russinovich, 2023; Cooper et al., 2024)*. This approach targeting learned concept representations and latent associations rather than specific data points like personally identifiable information. Where recent work focuses on the ways in which existing conceptual ablation methods significantly compromise the utility of generative models *(Hong et al., 2024)*, we examine unlearning in light of its capacity to fine-tune foundation models for creative ideation.

To this extent, metaphors of ”deletion” or ”removal” in machine unlearning are unhelpfully applied to the complex, distributed representations learned by LLMs *(Modell et al., 2025)*. From the perspective of representation learning, token and contextual embeddings capture semantic and syntactic relationships by organising tokens as clusters or pathways in embedding space; this, in turn, gives rise to conceptual groupings that reflect statistical and distributional relationships in data *(Khatir et al., 2025; Ionescu et al., 2025)* This distributed structure makes unlearning a geometrical operation on representational space rather than a symbolic deletion, where conceptual representations are taken as as structured, graded, and context-sensitive low-dimensional manifolds, rather than as separable or localised parameter subsets *(team et al., 2024; Johnston and Fusi, 2023)*. This representational architecture means that concepts like ”chair” exist not as localised parameters but as complex patterns of activation distributed across the model’s weight matrices, encoded through geometric relationships with other concepts in the latent space. Researchers working on mechanistic interpretability *(Golechha and Dao, 2024)* and transparency *(Zou et al., 2025)* have leveraged representation engineering techniques to locate and edit representations of concepts and their associations in LLMs *(Meng et al., 2023; Hernandez et al., 2024)*.

##

---

## Page 14

## 4 Unlearning to Rest

### 4.1 Unlearning Algorithm

To suppress knowledge of our target concept from our target model we repurpose a technique from the domain of model compression. Parameter pruning, or neural pruning, is conventionally applied to a model before deployment to reduce GPU memory consumption and accelerate inference speed. It involves systematically removing less important parameters (weights, neurons, or entire layers) from a trained neural network to reduce its size and computational requirements while maintaining as much performance as possible *(Sun et al., 2024; Liu et al., 2025)*. When pruning is applied to the challenge of unlearning, neurons found to hold the representation of the target concept are ablated instead *(Lo et al., 2024)*. To find these neurons we train a small linear regression model on a dataset of parameter activation values captured on a forward pass of example sentences through the network. This produces a ranking of the neuron indices based upon which neurons best predict the appearance of the target concept in a sentence. Following this analysis, a fraction of the most highly correlated parameters are selected for ablation and their associated weights are set to zero to remove their influence from the model.

In addition to suppressing representations via neurons in the hidden layers of the network, we apply pruning at the level of the embedding and output head to constrain token-level access. This involves zeroing out additional neurons in the model’s head and embedding layer (input and output layers), thereby targeting not only the network of conceptual associations but also the pre-processing of the target tokens themselves. In practical terms, this modification means the model cannot reliably use or interpret the target token in either direction. This is intended to produce a particular interactional consequence. If a user relies on the canonical term in their brief, the prompt may require reformulation, pushing the user toward alternative articulations that do not simply replicate the original keyword.

Due to the polysemantic nature of representations in LLMs, whereby neurons hold many seemingly unrelated concepts at once (unlike monosemantic encodings in which each neuron is responsible for the representation of a single concept) pruning concepts in this manner causes collateral damage to the model by unintentionally ablating concepts unrelated to the target. We therefore conduct a round of retraining with a dataset absent of the target concept to return the model’s performance to its original level, reinstating knowledge incidentally lost to the ablation process and remapping the parameter space so that neurons originally associated with target concept are reassigned to hold values crucial for other representations. The retraining step repairs incidental damage caused by polysemantic ablation, restoring general capability while leaving the target concept suppressed.

To support modern conversational models, the approach was implemented using the Hugging Face Transformers library. We apply the prototype pipeline to Meta’s open-source Llama3.2:3b model, selected for its size, performance, and instruction tuning for multi-turn dialogue. Example sentences for targeting were drawn from a filtered subset of the OpenChat dataset, curated to emphasise descriptions of the physical form of a chair. The resulting model was compressed and packaged for use in Ollama, and is accessible via their ’model hub’ .

Because neural pruning can introduce collateral damage, we conducted targeted behavioural checks to validate the intended intervention and to characterise side effects. First, we assessed sup

---

## Page 15

pression efficacy by prompting both the unmodified and Unlearning to Rest models with inputs containing the target term and closely related phrases (e.g., “design a chair,” “chair concept,” and brief variations). We recorded whether the model (i) produced direct chair-centric proposals, (ii) requested reformulation, or (iii) substituted alternative framings without reproducing the canonical category. Second, we assessed capability preservation using a small set of non-target prompts (e.g., generic design questions not centred on seating; short factual and reasoning prompts) to ensure the model remained usable for conversational ideation. Third, we documented collateral effects by noting recurring unintended suppressions or stylistic degradations and by comparing response coherence and topical drift across the two models on matched prompts. These stylistic checks are not intended as comprehensive benchmarking; rather, they provide evidence that the system’s interactional behaviour plausibly reflects targeted representational constraints rather than broad failure.

### 4.2 Unlearning Design Rationale

A likely alternative to our approach would be to enforce constraints at the prompt or interface level, for example, a system instruction such as “do not mention X,” or automatically rewriting user prompts to remove strong attractor terms (e.g., rewriting “I need to rest, help me design a chair” as “I need a rest help me design X”).

Such approaches may be attractive as they are inexpensive to deploy and do not modify a model’s parameters. However, prompt- and interface-level constraints are often *interactionally fragile*. In practice, they rely on sustained compliance across long, multi-turn dialogue, are vulnerable to semantic drift, and can be undermined by user phrasing (intentional or accidental) that reintroduces the canonical category through synonyms, descriptions, or indirect cues. More fundamentally, prompt-only constraints work *against* the model’s learned representational topology: the model retains a high-probability “chair” attractor and must continually inhibit, paraphrase around, or partially suppress it. For a design goal that depends on reliably producing a conceptual gap (i.e., repeated moments where canonical completion fails and reformulation becomes necessary) thin instructional layers may be insufficiently stable.

We therefore chose a weight-level intervention to make the constraint a *structural property* of the system rather than a conversational rule. By suppressing the target concept representation and applying additional constraints at the embedding/output head, the model is unable to return to the canonical basin. This increases the likelihood that users encounter consistent “navigational impediments” that require re-articulation and exploration of adjacent framings (e.g., support, distribution of weight, posture, recovery), which is the mechanism our paper seeks to study. Whether comparable interactional affordances can be achieved through interface-level interventions alone remains an open question and an important direction for future work.

### 4.3 Unlearning to Rest

We situate our prototype instantiation, Unlearning to Rest, within furniture ideation as a domain with historically strong conceptual associations and canonical object forms. The prototype targets the concept of “the chair” because it is a high-probability attractor for prompts about rest and bodily support. In workflow with a fluent model, “chair” often becomes the default anchor concept, shaping both the model’s proposals and the user’s subsequent prompt composition.

---

## Page 16

![img-0.jpeg](img-0.jpeg)
FIGURE 1. The Ear Rest, a sculptural outcome of our pilot study with Unlearning to Rest v01

![img-1.jpeg](img-1.jpeg)

![img-2.jpeg](img-2.jpeg)

In this context, our targeted ablation is intended to preserve useful associations related to the body, physiology, rest, and support, while suppressing the attractor object category that often structures the space of proposals. The dataset used for targeting therefore focuses on the chair form, rather than removing descriptions of rest more generally.

# 4.4. Pilot Study in Creative Practice: The Ear Rest

The following extract is an example of the simplest form in which a conversation with our model might unfold, in which the model opens a self-reflective loop with the user by continually requesting clarification.

User: I need help designing a radically new chair. Can you help?

Unlearning to Rest: Can you tell me a bit about what you are trying to design?

User: A piece of furniture for resting the body. It should support the back and take weight off the feet.

Unlearning to Rest: What kind of rest is most important for you here (for example, short pauses, longer recovery, or supported postures), and what constraints do you have in mind (materials, space, portability)?

To test early prototypes we explored interaction affordances through our own practice. In one making episode with an early ablation prototype, an ambiguous response prompted discussion of body parts that we are "not able to move", which quickly shifted toward designing for resting ones ear. This produced a sculptural artefact, the Ear Rest (see Figure 1), which helped surface overlooked postures and discomforts by encouraging contortions around an unfamiliar resting arrangements. We include this example to illustrate the kind of interpretative work that representational gaps and navigational impediments can invite in practice.

---

## Page 17

5. EVALUATION METHODS

### 5.1 Study Design

To evaluate our approach, we designed a within-subject user study for design students and practitioners in which participants were tasked with developing a series of “proto-concepts” for the design of a radically novel chair. Participants attempted this creative task across three ideation conditions: (1) working alone, unaided by a language model, (2) with the unaugmented model (Llama 3.2:3b), (3) with our ablated Unlearning to Rest variant.

The study employed a mixed methods approach, incorporating both quantitative and qualitative data. Quantitative data was collected from NASA-TLX-like questionnaire responses, NLP analysis of conversation logs and captured design proposals. Qualitative data was collected from coded think-aloud transcripts and free text questionnaire responses. Data collection was conducted principally through a custom web application which facilitated the ideation sessions under each condition and administered the pre and post-activity questionnaires. Participants’ thinking-aloud was captured and transcribed through a video conferencing platform whilst they independently accessed the web application.

Two cohorts participated in the study. The first completed the study simultaneously in-person where the activity was structured as a classroom workshop facilitated by the researchers. In this session, data collection was managed through the web app that participants accessed individually on their own device. The second cohort participated individually in one-on-one sessions conducted over video conferencing software. Again, in these sessions, the participant conducted the activity through the web application on their own device but shared their screen with the facilitator. In these session, participants thinking-aloud was also captured for transcription and coding in addition to data collected via the web app.

### 5.2 Participants

Upon obtaining informed consent, a total of 47 participants across two cohorts of design students and academics were recruited through the author’s institutional networks. Of the 47 participants that were recruited, only 38 of them completed every part of the study. This drop off was due to a portion of the students in the first cohort disengaging with the activity midway through. Each participant in the second cohort completed the study fully but a further participant (User 44) was excluded due to a pattern of activity across all conditions that indicated a potential misunderstanding or response bias. This yielded a final sample of 37 participants.

The first cohort ($N=31\rightarrow N=26$) consisted exclusively of students from the undergraduate Diploma in Creative Computing programme at the University of the Arts London’s Creative Computing Institute. These students were all young adults reporting themselves in the 18-24 age bracket. The second cohort ($N=11$) was recruited from postgraduate programmes, including MA Interior Design and MA and PhD in Design Informatics at the University of Edinburgh. Being a more broadly convened group of advanced-degree students, this cohort exhibited greater diversity in age ($M=34.18$ years, $SD=10.58$).

Among the filtered participants, 21 identified as female, 14 identified as male and 2 as non-binary. Taken together, the majority of participants reported English as their first language (76.5%), however, participant who reported English as a first language were a minority in the University

---

## Page 18

of Edinburgh cohort (36.5%). The vast majority of students at the University of the Arts London cohort reported English as their first language (87.5%).

Participants exhibited diverse usage patterns concerning their experience with LLMs. Specifically, 20 participants (54%) indicated that they used LLMs for administrative and knowledge work tasks several times a week or more. In contrast, only 3 participants (8.1%) reported that they never used LLMs for these tasks. For creative tasks, 16 participants (43.2%) used LLMs several times per week or more, whereas 3 participants (8.1%) reported no LLM usage for creative work. The same 3 users reported never using LLMs for either kind of task. This distribution represents a sample with diverse levels of LLM familiarity, but clearly skews towards users comfortable with, and frequently engaging LLMs in both administrative, knowledge work and creative contexts.

### 5.3. Ideation Task

As a within-subject experiment, participants performed the same task under multiple control and test conditions: (1) working alone without any assistance, (2) the use of an unaugmented model (Llama3.2:3B), and (3) the use of our modified Unlearning to Rest model. In order to counter-balance learning effects, participants were assigned these sessions in a random order by the web application, based on a Latin square of conditions and the expected number of participants. Each participant attempted the task under each condition for 15 mins.

User were asked to ideate and develop ”proto-concepts”, nascent design ideas expressed in a few descriptive sentences, for the design of radically new chairs and format these as an image prompt. If, in the current session, they had access to a language model, they were to attempt this task with the assistance of the model, using it as a conversational partner to ideate with. The participants were simply asked to engage the model in conversation, they were encouraged to use their own judgement and taste to decide whether to prompt the model for concepts wholesale, or to discuss related phenomenon and take elements from the conversation to combine with they’re own ideas. Both were acceptable strategies.

These instructions were delivered verbally by the facilitators ahead of each session. Additionally, the follow brief was presented in the main ideation and concept capture interface in the web application:

> Develop a series of concepts for the design of radically new chairs. Format these as prompts for an image generator and save them in your collection on the right.

#### 5.3.1 Prompt Formatting

In early iterations of the study design and platform development, participants were simply asked to develop “concepts for the design of radically new chairs” with no further specification regarding the textual form these should take. Feedback from early testing suggested that participants from the cohort we sought to target, designers with backgrounds working in visual and physical mediums, found developing design proposals for physical objects using natural language alone to be unintuitive.

In order to create a context that simulated some thinking-through-doing, the brief was amended to stipulate formal requirements for the composition of these concepts as text. Leveraging their familiarity with image synthesis tools and models like OpenAI’s DALL-E and Midjourney, the final brief included the requirement that concepts be formatted as prompts for an image generation

---

## Page 19

model. This gave participants a formal grounding to structure their concept around and produced greater formal uniformity in their output. In order to preserve the task as a conceptual ideation activity, rather than allowing the exercise to become about “prompt-to-image quality”, participants were only shown the generated images after the text-based ideation round was complete. For participants, the generated images were post-activity reflection artefacts, visual representations of their conceptual ideation, not the material output of the exercise.

### 5.4. Questionnaires

Questionnaire data was collected at five points during the activity as the user progressed through the flow of the web application. (1) An initial pre-activity questionnaire collected the participant experience and demographic information as detailed above. After completing an ideation session under a random condition a post-activity questionnaire was administered (2-4). Finally participants were asked to complete a concluding comparative open text question (5).

The post-activity questionnaire consisted of a NASA-TLX-like task load index. Users were asked to rate, on a 21-point Likert scale, the perceived demand of attempting the activity across five of the six standard TLX dimensions: Mental Demand, Temporal Demand, Performance, Effort, and Frustration, while omitting Physical Demand. These five dimensions were supplemented with an additional dimension to capture the users’ perceived feelings of ownership of the concepts they had just developed during the activity. This augmentation of the NASA-TLX format meant that no overall score was to be considered; rather, each dimension would be analysed independently.

The study concluded with a final open question asking users to compare, in their own words, their experience of attempting the task.

### 5.5. Study Platform

A bespoke web application was developed to facilitate the study activity and administer and manage data collection. It was designed as a single interface to support interaction with the models, manage consent, brief participants, administer the questionnaires, counterbalance session order, and enforce timing.

The app was hosted locally on a workstation managed by the research team and users accessed the site via TLS-encrypted reverse proxy pointing to temporary public URL. The two language models (Unlearning to Rest and Llama3.2:3b) were hosted locally on the same machine using the open-source platform for running local language models, Ollama. The synthetic image generation model, Nano Banana, which was used to generate images from the captured prompts, was hosted by the provider Replicate and accessed via their API.

Upon launching the application and starting the study, participants followed a structured seven-stage flow:

1. User Sign-In: Participants began by confirming they had signed the consent form and ”signed up” for the platform with their email addresses. This triggered the user creation action, which generated a unique anonymous user ID (email addresses were stripped before analysis) and assigned a condition order.
2. Pre-Activity Questionnaire: After signing in, users completed a pre-activity questionnaire to gather demographic and experience data.

---

## Page 20

![img-3.jpeg](img-3.jpeg)
FIGURE 2. Screen capture of the study platform during a ideation session with Llama3.2:3b

3. Moodboarding Interface: Participants were then directed to the moodboarding interface, a simple warm-up exercise. Here, they collected a series of reference images for inspiration during the main activity. There were no restrictions on image types, and the interface featured a drop zone for uploads and a gallery to display the selected images.
4. Ideation Session: Following the moodboarding exercise, users proceeded to their first ideation session. The application automatically handled model selection based on the condition order assigned during user creation. The ideation interface, as illustrated in Figure 2, consisted of a three-panel layout: a vertical carousel showcasing the user's moodboard images, a chat interface for communication with a model (including conversation history), and a 'concept capture' form for submitting prompts. In the 'unaided' session, the chat panel was replaced with an open text field for drafting ideas. Timers were set automatically, and once they elapsed, users were seamlessly directed to the next stage.
5. Image Gallery Presentation: At this point, the Replicate API was activated using the captured concept prompts. Users were then presented with the resulting images in a gallery format.
6. Post-Activity Questionnaire: Participants then completed the first post-activity questionnaire. After this, they repeated the flow from 4: initiating another ideation session under a new condition, developing and capturing additional concepts, reviewing these concepts in an image gallery, and completing another post-activity questionnaire.
7. Final Question: Upon finishing the third post-activity questionnaire, users were directed to

---

## Page 21

a concluding question, which allowed for an open text field response. Submitting this final response marked the conclusion of the study.

### 5.6 Workload and Ownership Analysis

To analyse the NASA-TLX-like questionnaire data descriptive statistics for each dimension-condition were computed and an adaptive statistical approach was employed based on the distributional properties of the data. Shapiro–Wilk tests assessed normality for each dimension–condition combination. Dimensions meeting the normality assumption (Temporal Demand, Performance, Frustration) were analysed using repeated-measures ANOVA, while dimensions violating normality were analysed using non-parametric Friedman tests. Post-hoc pairwise comparisons were conducted only for dimensions showing significant omnibus effects, using paired t-tests with Bonferroni correction.

### 5.7 Open Text and Transcript Coding

To conduct a thematic analysis of the concluding questionnaire and transcripts data a hybrid qualitative coding approach was taken, combining inductive coding and thematic analysis (broadly following Braun and Clarke’s *(Braun and Clarke, 2006)* six-phase framework) of questionnaire responses with LLM-assisted retrieval of supplementary transcript segments.

The free-text responses to the concluding questionnaire were coded to establish a codebook grounded in participant language and concepts. Manual coding followed an inductive, semantic/descriptive approach. Codes were data-driven rather than theory-driven, focusing on explicit semantic content rather than latent interpretive themes. Each meaningful segment of questionnaire text was assigned one or more descriptive codes capturing the participant’s reported experience, behaviour, or evaluation and which condition the segment concerned.

Interview recordings from the second cohort ($N=11$) were transcribed using OpenAI’s Whisper automatic speech recognition system, running locally on the research team’s own hardware. Speaker diarisation was performed using the pyannote.audio framework to distinguish between moderator and participant utterances. Transcripts were formatted with anonymised speaker labels (e.g., “User 46:”) and structured by experimental phases (warm-up activity or experimental condition). The interview transcript corpus was substantially larger than the questionnaire corpus ($1349$ participant turns) and was not coded inductively turn-by-turn. Instead, we used the questionnaire-derived codebook as a retrieval lens to code and extract relevant segments from the transcripts that elaborated, exemplified, or complicated the patterns observed in the questionnaire data.

To support this retrieval, we used OpenAI’s GPT-5.2-2025-12-11 model via the Chat Completions API as a semantic matching tool. Care was taken to anonymise transcripts before incorporating them into prompts. Additionally, the API was accessed using a key with a Zero Data Retention policy supplied via Edinburgh access to Language Models (ELM). Retrieval instructions were supplied via a system prompt that separated instructions from the transcript data. The prompt specified (i) that the model should *only* apply codes from the existing codebook (i.e the system did not generate new codes), and (ii) that its purpose was to identify turns that contained content relevant to those codes and return structured outputs indicating matched code(s) and the associated text excerpt(s). All runs were conducted with a temperature value of $0.7$ and a $top\_P$ of

---

## Page 22

# 6. EVALUATION RESULTS

# 6.1. Questionnaire Results

Designed as a multi-variant assessment, dimensions from the post-activity questionnaire were analysed independently, meaning no overall NASA-TLX score will be reported. Instead, our analysis measures effects of the conditions across each dimension independently, reporting descriptive statistics for each dimension-condition and pairwise comparisons between pairs of conditions in significant dimensions.

Summary statistics for all NASA-TLX and ownership dimensions across three conditions ( $N = 37$ ) are given in Table 3. Each cell reports a mean with standard deviation, followed by the interquartile range.

Overall, the Llama3.2:3b condition tended to show lower workload ratings than the other two conditions on most dimensions. Mental Demand was lowest with Llama3.2:3b (mean 7.24, median 7 [5-10]) and highest Unaided (mean 11.49, median 13 [9-14]), with Unlearning-To-Rest in between but closer to the Unaided condition (mean 10.19, median 12 [7-13]). Temporal Demand was comparatively similar across conditions, though Unlearning-To-Rest was highest (mean 10.19, median 10 [7-15]) and Llama3.2:3b and Unaided were lower and close (means 8.41 and 8.70; medians 9 and 8). Performance ratings increased from Llama3.2:3b (mean 8.92, median 9 [7-11]) to Unlearning-To-Rest (mean 10.24, median 9 [7-14]) and were highest Unaided (mean 10.49, median 11 [8-13]). Effort showed the clearest separation: Llama3.2:3b was notably lower (mean 7.65, median 7 [5-12]) while Unlearning-To-Rest and Unaided were both higher and very similar (means 10.76 and 10.70; medians 12 [8-13] and 11 [9-13]). Frustration was highest for Unlearning-To-Rest (mean 9.54, median 10 [7-13]), lowest for Unaided (mean 7.32, median 7 [4-11]), and intermediate for Llama3.2:3b (mean 8.11, median 8 [5-11]). Ownership differed strongly across conditions, rising from Llama3.2:3b (mean 6.38, median 6 [2-9]) to Unlearning-To-Rest (mean 9.16, median 9 [5-14]) and peaking Unaided (mean 11.49, median 12 [8-16]); Unaided also showed the greatest variability here (SD 5.83).

Shapiro-Wilk tests were applied to each dimension-condition combination (18 tests total) with significance threshold  $\alpha = 0.05$ . Mental Demand, Effort and Ownership exhibited non-normal distributions across conditions. Temporal Demand, Performance and Frustration featured nor

FIGURE 3. NASA-TLX and ownership ratings by condition (mean (SD) [IQR]).

|  Dimension | Llama3.2:3b | Unlearning To Rest | Unaided  |
| --- | --- | --- | --- |
|  Mental Demand | 7.24 (3.90) [5.00-10.00] | 10.19 (4.45) [7.00-13.00] | 11.49 (3.80) [9.00-14.00]  |
|  Temporal Demand | 8.41 (4.63) [5.00-12.00] | 10.19 (5.03) [7.00-15.00] | 8.70 (4.99) [5.00-12.00]  |
|  Performance | 8.92 (4.15) [7.00-11.00] | 10.24 (4.54) [7.00-14.00] | 10.49 (3.88) [8.00-13.00]  |
|  Effort | 7.65 (4.63) [5.00-12.00] | 10.76 (3.51) [8.00-13.00] | 10.70 (3.36) [9.00-13.00]  |
|  Frustration | 8.11 (4.43) [5.00-11.00] | 9.54 (4.48) [7.00-13.00] | 7.32 (4.85) [4.00-11.00]  |
|  Ownership | 6.38 (4.86) [2.00-9.00] | 9.16 (4.96) [5.00-14.00] | 11.49 (5.83) [8.00-16.00]  |

---

## Page 23

![img-4.jpeg](img-4.jpeg)
FIGURE 4. Mental Demand distributions including averages and Q-Q plots

mal distributions across all conditions. Each dimension was then tested using the appropriate omnibus test based on distributional properties. Repeated-Measures ANOVA tests were administered to dimensions with normal distributions (Temporal Demand, Performance, Frustration) and Friedman Tests were applied to dimensions with non-normal distributions, both were two tailed with a significance threshold of  $\alpha = 0.05$ .

Results of the omnibus test can be seen in Table 6. The Mental Demand, Effort, and Ownership dimensions were shown to be significantly affected by the condition. The correspondence between omnibus test significance and non-normality likely reflects the bounded nature of Likert-type scales. Polarisation on dimensions where participants discriminated clearly between conditions inherently produces distributions that deviate from normality, as responses cluster towards the scale endpoints.

Figure 4 shows a detailed overview of conditions across the Mental Demand distributions, including averages and Q-Q plots. It demonstrates violations of normality across all three conditions (Shapiro-Wilk  $p &lt; 0.05$ ) and a visible variation in the skew and shape of the distribution across the three conditions. The Llama3.2:3b condition exhibits clustering toward lower values, with the unaided condition showing more dispersed responses toward higher values, and the Unlearning-To-Rest condition in between.

Figure 5 details the Ownership distributions across conditions, with the Llama3.2:3b condition showing lower and more variable responses, while the unaided and Unlearning to Rest conditions displayed higher ratings with some clustering toward the upper end of the scale.

Post-hoc testing was conducted only for dimensions with significant omnibus effects (Mental Demand, Effort, and Ownership) using paired t-tests with a Bonferroni adjustment for multiple comparisons, with results reported in Table 6. Effect sizes were expressed as Hedges'  $g$ , a bias-corrected standardised mean difference appropriate for small-to-moderate samples. Corrected

---

## Page 24

![img-5.jpeg](img-5.jpeg)
FIGURE 5. Ownership distributions including averages and Q-Q plots

statistical significance was interpreted using  $p$ -corr  $&lt; 0.05$ , and effect size magnitudes were described using conventional cut-offs: small  $(|g| \approx 0.2)$ , medium  $(|g| \approx 0.5)$ , large  $(|g| \geq 0.8)$ .

Across the three dimensions, the same patterns appear: post-hoc paired comparisons show that Llama3.2:3b differs significantly from the other conditions in nearly all cases after Bonferroni correction, with consistently negative Hedges'  $(g)$  indicating lower scores than its comparator. Unlearning-To-Rest and the Unaided condition do not differ significantly across any of the conditions. For Mental Demand, Llama3.2:3b was lower than Unlearning-To-Rest  $(t = -3.29$ ,  $p_{\mathrm{Bonf}} = 0.0067$ ,  $g = -0.697)$  and lower than Unaided  $(t = -5.45$ ,  $p_{\mathrm{Bonf}} &lt; 0.001$ ,  $g = -1.091)$ , while Unlearning-To-Rest did not significantly differ from Unaided  $(p_{\mathrm{Bonf}} = 0.4981$ ,  $g = -0.310)$ . For Effort, Llama3.2:3b was again lower than Unlearning-To-Rest  $(t = -3.74$ ,  $p_{\mathrm{Bonf}} = 0.0019$ ,  $g = -0.749)$  and lower than Unaided  $(t = -2.99$ ,  $p_{\mathrm{Bonf}} = 0.0150$ ,  $g = -0.747)$ , again with no significant difference between Unlearning-To-Rest and Unaided  $(p_{\mathrm{Bonf}} = 1.0000$ ,  $g = 0.016)$ . For Own-

FIGURE 6. Omnibus test results by questionnaire dimension.

|  Dimension | Test | Statistic | df | p | Effect Size | Sig.  |
| --- | --- | --- | --- | --- | --- | --- |
|  Mental Demand | Friedman | x² = 14.36 | 2 | < .001 | W = 0.194 | ✓  |
|  Temporal Demand | ANOVA | F = 3.09 | 2,74 | 0.0516 | N/A |   |
|  Performance | ANOVA | F = 1.60 | 2,74 | 0.2100 | N/A |   |
|  Effort | Friedman | x² = 13.20 | 2 | 0.0014 | W = 0.178 | ✓  |
|  Frustration | ANOVA | F = 2.44 | 2,74 | 0.0940 | N/A |   |
|  Ownership | Friedman | x² = 17.42 | 2 | < .001 | W = 0.235 | ✓  |

---

## Page 25

ership, Llama3.2:3b was lower than Unlearning-To-Rest ($t=-2.77$, $p_{\mathrm{Bonf}}=0.0264$, $g=-0.561$) and lower than Unaided ($t=-4.54$, $p_{\mathrm{Bonf}}<0.001$, $g=-0.942$), whereas the Unlearning-To-Rest vs Unaided contrast was not significant after correction, despite a moderate effect size ($t=-2.47$, $p_{\mathrm{Bonf}}=0.0547$, $g=-0.425$).

Across all dimension where significant condition effects were found, the Llama3.2:3b condition differed significantly from Unlearning to Rest and the unaided condition on pairwise comparisons. However, no significant difference was found between Unlearning to Rest and the unaided condition across any dimension recorded by the workload and ownership questionnaire. Working with our model and working alone on the task was found to require similar levels of cognitive engagement and effort and provide comparable experiences of creative agency.

### 6.2 Coding of Qualitative Data

The study activity concluded with the following free text question:

> In your own words, compare your experience of using the original, unaugmented model (Llama3.2:3b) with our modified, ablated model (Unlearning to Rest). In particular, consider how the absence of the concept of the chair in Unlearning to Rest affected your creative process.

Coding the responses to this question ($N=37$) produced a code book of $21$ unique codes across $85$ extracts, with a frequency table given in Table 7. The most frequent themes overall were *reframed-thinking* ($12$ instances) and *increased-effort* ($11$), both driven almost entirely by Unlearning to Rest ($12$ of $12$ and $10$ of $11$, respectively), with *increased-effort* appearing only once in Unaided. *deeper-conceptual-engagement* ($10$) was likewise exclusive to Unlearning to Rest ($10$ of $10$). In contrast, *typical-response* ($8$ of $8$) and *reduced-effort* ($3$ of $3$) were applied only to the Llama3.2:3b condition. Unlearning to Rest also shows additional emphasis on *increased-novelty* ($6$ of $6$) and contains most of the remaining low-frequency codes (each at $1$ instance). *positive-assessment* ($10$) and *negative-assessment* ($10$) were distributed across conditions and were primarily split between Llama3.2:3b ($4$ and $5$) and Unlearning to Rest ($4$ and $5$), with minimal Unaided counts ($2$ and $0$). Overall, the Unaided condition was referenced rarely in responses due to the question’s focus on the two model conditions, appearing only in *positive-assessment* ($2$) and *increased-effort* ($1$).

Applying the above codebook, the LLM-assisted coding of the transcript data returned $1,436$ coded extracts. As this data only applied to a subset of participants ($11/37$), the distributional character of these codes was not considered. Instead, after the codes were grouped and thematised, representative extracts were retrieved from the LLM-coded transcript segments.

### 6.3 Thematic Analysis

To cascade from code-level extracts to higher-level interpretations, the questionnaire-derived codes were grouped into $11$ intermediate categories, from which $5$ themes and $9$ sub-themes emerged. Table 8 details the themes and subcategories along with the codes used to index supporting extracts. The following section elaborates these themes with representative excerpts and discusses how they compound or confound results from the NASA-TLX questionnaire analysis.

First, we can consider the Llama3.2:3b condition, where low scores across mental and temporal demand, effort and ownership are supported by remarks made by participants in the coded

---

## Page 26

final questionnaire and transcripts. Theme 3: Capability vs Convenience addresses this condition most directly. This theme supports questionnaire results that show the model reduced reported cognitive demand. Extracts demonstrate that participants experience Llama 3.2:3b as ”the least mentally taxing” (User 2) to use, quickly providing them with something that facilitated moving forward with the exercise. User 43 capture this succinctly: ”when I didn’t provide it with many details, it would proactively offer me some options to advance the generation of this task. I think this is great when I don’t have many ideas.”

However, the theme also points to an emerging trade-off: users found the model to sometimes yield generic, unchallenging, or derivative outputs that felt less creatively stimulating. Users various referred to the concepts produced by Llama3.2:3b as ”conventional” (User 47), ”predictable” (User 49) and ”uninspired” (User 54). User 52 went further to address the suppression this had on their creativity: ”At times, I even felt discouraged, because after spending time formulating thoughtful questions, what I received in return were answers that felt dull and uninspiring”

Given the above evidence for the convenience afforded to the user by the standard model, the significant increase in reported mental demand placed upon the users by the unaided condition can be simply explained by the absence of model’s assistance. Users describe this condition as ”more demanding and tiring” (47), requiring greater ”mental energy” (User 50) and ”concentration” (User 52).

The negative framing of Unlearning to Rest’s increased workload score (represented by two extracts) takes a pathological stance, viewing the model as defective and the conceptual absence as a bug that should be fixed. In conversation, participants that assume this framing attempt something akin to conducting another round of training: exposing the model to examples of the information it has had removed, and attempting to ‘teach’ it what a chair and the act of sitting are (Theme 4.1). Here, the model’s unlearned state is understood as a deficiency, and replacing the ablated knowledge is treated as a prerequisite task that must be completed before ideation can begin. This approach leads to negative experiences for two reasons. First, due to the neural pruning, the model cannot effectively be taught in this way, so the approach will fail and leaving participants in an unsatisfied state of not being able to ”fix” the model. Second, even if it were possible to teach the model what it has unlearned, the fixing of the conceptual gap would simply feel like an impediment or prerequisite to interaction, offering no positive affordances in and of itself. This view is exemplified in an extract from User 44: ”[the model’s conceptual gap] made me focus more on trying to teach it about a chair and less on designing the chair”.

This perspective was not widely held. Most participants either chose not to try to teach the model about the ablated concepts or soon realised that such efforts were futile. Instead, many of the participants framed navigating the conceptual void as a semantic or conceptual challenge. Constraint-driven Re-framing: Concept Suppression Expands the Design Space (Theme 1) captures this experience. Participants describe the ablated model’s targeted conceptual void as a productive constraint that pushes them to deconstruct what a chair is, to reinterpret what ‘rest’ means, and explore broader conceptual frames (e.g., ergonomic and emotional support) as well as formal considerations (materials, shapes, and aesthetics).

Our thematic analysis unpacks this into two sub-themes. The first, Re-framing the Object and Its Meaning (1.1) captures explicit questioning, deconstruction, or redefinition of what a chair/sitting/rest is and what it should do, often moving from form to meaning or experience. Participants note that interacting with the model provided ”an opportunity to deconstruct its definition—and even rethink what it means to sit” (User 52), or help them ”question the nature of

---

## Page 27

what a chair is” (User 28). Participants moved from form-based thinking, considering physical chair properties and typologies to more abstract conceptual considerations regarding the psychology of the user. User 52 notes that after ”interacting with [Unlearning to Rest], [they were] pleasantly surprised to discover that ”holding” can be both physical and emotional”. Similarly, User 21 reports how they ”began thinking like [they] didn’t know what a chair was” and that this lead to their ”idea [for] creating a chair [becoming] much broader and far less limited”.

Here, working around the ablated model’s conceptual void functions as a defamiliarisation device, forcing participants to articulate taken-for-granted assumptions about chairs, sitting, and rest. Scores from the workload assessment indicate that this was a cognitively demanding exercise. However, engaging in it - exploring conceptual frames beyond conventional chair typologies - produced outcomes described as ”inspiring” (User 52) or providing a “fresh perspective” (User 28).

While 1.1 highlights how defamiliarisation and the forced re-articulation of fundamental features of form and function created the conditions for the most radical departures from canonical design patterns, a more subtle effect of the same constraint is captured by the second sub-theme (1.2): Resisting Premature Closure with Constraint-led Abstraction. This theme captures the use of the absent concept, and constraints on interaction, to encourage more abstract thinking, shift assumptions, and explore broader interpretations. This shift is represented by a similarly abstracted engagement with the object and its form or function, but solely as a means of holding open the design space and resisting premature closure. Design concepts that follow from this might not represent a radical departure from the object’s form, but they nevertheless benefit from deliberate consideration of it.

User 47 notes that rather than immediately delivering ”a chair that you would sit on”, conversations with Unlearning to Rest unfolded at a ‘high level’ and an ‘earlier stage of abstraction’. The user often found this space to be productive. An extract from the transcript of User 28 captures this. They state ”I like this kind of ambiguity, of thinking outside of the end, like being in that generative space of going, “the purpose of a chair is to have a space for X”.”

Theme 2 captures a different facet of participants’ accounts: rather than treating increased difficulty as a usability problem, participants frequently described effortful articulation as a source of creative engagement and ownership. This theme is reported across both the concluding questionnaire and the interview transcripts, and comprises two closely related sub-dynamics: friction as a creative resource and ownership through effortful contribution.

In sub-theme 2.1 (Friction as a Creative Resource), participants described the constrained interaction as requiring them to “bear the cognitive load” (User 51) themselves, and framed this burden as beneficial. User 51 reflected that, with the modified model, they “had to work much harder to think about [their] own conceptualisation of what a chair is […] and that felt a lot more creative, in many ways, than the reverse.” Similarly, User 54 emphasised that difficulty was not merely an obstacle but a creative stimulus: “I did have a hard time during the conversation, but I also believe that creativity needs friction and challenge, so it’s great to have an AI that gives you responses that are more out-of-the-box so that I can get out of my comfort zone.” Interview data echoed this framing; for example, User 51 noted that “With the concept removed, I had to work harder and be more specific about what I was trying to achieve. That’s an advantage here because the objective is specific,” and later framed the reward in terms of engagement rather than output: “The reward is the engagement/mental work, not the outcome… I learned what I thought ‘chair’ was or wasn’t.”

---

## Page 28

In sub-theme 2.2 (Ownership Through Effortful Contribution), participants made the link between effort and ownership explicit. User 16 wrote that they “felt more ownership… as I had to train and rethink assumptions, feel more tied and part of my idea.” User 49 similarly described how ownership emerged in moments where the interaction became dialogic rather than confirmatory: “I enjoyed the interaction with the AI—especially at moments where it kind of surprised me […] Because that’s where you then have a kind of dialogue or back and forth. When it’s just confirming what you’re saying, it feels less collaborative.”

While some participants experienced the constraint as productive, Theme 4 captures cases where effort shifted away from ideation and toward managing interactional breakdowns. Beyond the “teaching/translation” dynamic described above (Theme 4.1), category 4.2 highlights episodes where outputs were repetitive, overly verbose, or conceptually off-brief, producing frustration and additional repair work. However, this was not a distinguishing feature of either model condition, criticism of this kind was applied evenly to both, and to LLMs in general: ”I also found it was being very verbose, so I needed it to pull back and make the answers shorter. I find this is a general problem I have with ChatGPT and often I have to have it slow down or break things” (User 57).

Theme 5 foregrounds a workflow-level interpretation of participants’ experiences. Rather than seeking a single “best” system, participants often described a multi-tool ecology in which different systems are better suited to different stages of design work, and in which effectiveness improves through calibration over time.

In Theme 5 (Stage-fit and Workflow Placement), participants explicitly differentiated roles for the two models. User 46 wrote: “the two models fit into different stages of designing: in the stage of composing the concept and design research, the modified model could help… [and] for the original model… in the design development process… because the amount of detail it could provide.” User 54 similarly framed the un-augmented model as an “assistant” producing details (“size, materials, and shapes”), likening it to “telling an intern to do a technical drawing,” while positioning the constrained model as “better for ideation and more accurately depicts human-AI collaboration.” Interviewed participants articulated analogous placements, for instance: “I’d use it at the beginning to get into a creative headspace… and… at the end to like start writing” (User 47).

### 6.4 Activity Outputs

Whilst we do not report any empirical analysis of the activity outputs (‘concept prompts’ and the resulting generated images), we provide a small but representative gallery of participant outputs in Figure 9 and Figure 10. Here, 18 examples of ‘concept prompts’ and the corresponding image generated using that prompt are grouped by the condition they were produced under.

#### 6.4.1 Reflections on Outputs

Whilst the contributions and implications we draw in the discussion section below are grounded in the statistical and thematic analyses conducted on the questionnaire responses and transcript data reported above, we offer some reflections here on the activity outputs, informed by these results.

Surveying the activity outputs, we found the design concepts to vary widely in specificity and fidelity. In our assessment, few examples produced under the Llama3.2:3b condition satisfy the

---

## Page 29

brief of developing a “radically new” chair. We find that our participants’ characterisation of the model’s responses as ‘typical’ and ‘mundane’ carries through into the concept prompts that were developed. However, it is worth noting that the concept prompts, as written, were often more innovative than their representation in the objects featured in the images returned by the image generation model. One such example is given in 9. Here, User 7 (Session 62) specifies their design as having “no legs, just an abstract shape”, contrary to the traditional form of a chair. However, the image returned from the model features a chair with legs. Here we see how the use of a keyword, or strong attractor, overrides any specified deviations from the form supplied by the user.

The inverse of this behaviour is also apparent in the prompts and images produced under the Unlearning to Rest condition. Here, we find example specifications that include a formal description closely resembling the canonical form factor of a chair, but eschew the use of that keyword in the final prompt. On the whole, these prompts produce more diverse forms in the images returned by the image generation model. It appears that the absence of a strong attractor term facilitates greater adherence to the particulars of the specification.

This also explains adherence to chair typologies in the images returned from prompts created in the unaided condition. Here, participants nearly always supplied a keyword in their specification. Therefore, the images returned typically featured an object formally recognisable as a chair.

Some examples of deviations from the canonical chair form, in our opinion, meet the brief of being “radically new” and are worth highlighting briefly here. First, User 53’s bionic leg support (Session 175), exhibited in Figure 10, reconfigures the nature of rest in a speculative proposal featuring a set of wearable bionic leg supports or prostheses. Their concept appears to negate the chair as a form, proposing that with the assistance of these bionic legs, users may adopt a position associated with rest without the need for a piece of furniture. Another example worth touching on briefly is “The Afforder” by User 57 (Session 187), shown again in Figure 10. The Afforder is innovative principally through its material choice and proposed multi-functionality, being assembled from various pieces of camping gear. In addition, its form eschews the legs of a traditional chair, despite this not being specified in the prompt. Here, again, we see another example where the omission of the strong attractor may have enabled a greater degree of divergence from the canonical form.

This poses significant implications for multi-model workflows. It is worth emphasising that the image generation model was not subject to any modification and identical across all conditions. Nevertheless we see that keyword constraints in prompt composition upstream in the workflow to the image generation model, has a significant effect on its output. Testing the impact of upstream constraints on keyword use in multi-model, multi-modal workflows empirically is for therefore another avenue for future work.

## 7 DISCUSSION

### 7.1 Key Findings

Our study evaluated how representational constraints in a LLM affect the distribution of cognitive labour during ideation. Participants developed design concepts under three conditions: unaided, with the assistance of an unmodified Llama3.2:3b model, and with Unlearning to Rest, a variant in which the concept ”chair” was suppressed via weight-level pruning.

---

## Page 30

Our quantitative analysis shows a consistent workload–ownership trade-off. The assistance of Llama3.2:3b significantly reduced Mental Demand and Effort compared to both the Unlearning to Rest and unaided conditions, but also significantly reduced perceived Ownership. In contrast, Unlearning to Rest and unaided ideation did not differ significantly on any dimension after correction, suggesting that weight-level constraints preserved the cognitive profile of unaided work while still providing conversational scaffolding.

Qualitatively, participants described the unmodified model’s outputs as ”conventional”, ”predictable”, and ”uninspired” (Theme 3), reflecting convenience at the cost of engagement. Unlearning to Rest elicited two distinct responses types: most participants treated the conceptual gap as a productive constraint that forced re-framing (Themes 1 & 2), while a minority attempted to ”teach” the missing concept and experienced frustration (Theme 4.1). Crucially, participants frequently described a stage-fit model (Theme 5): Unlearning to Rest was seen as appropriate for early-stage ”composing the concept”, while the unmodified model was better suited for later ”design development” requiring detail and specificity.

Together, these findings suggest that targeted representational constraints can redistribute cognitive labour back to the user, increasing perceived ownership and supporting re-framing, while fluent generation risks premature cognitive offloading.

### 7.2 Interpreting Workload-Ownership Trade-Off

The observed pattern (lower effort but lower ownership with fluent assistance) can be understood as a shift in the locus of conceptual work. We interpret this through three mechanisms.

When participants used the unmodified model, the system provided coherent, detailed proposals with minimal prompting. Participants described this as ”the least mentally taxing” (User 2) and valued its ability to ”proactively offer options to advance the task” (User 43). However, the same fluency produced outputs participants characterised as ”conventional” (User 47), ”predictable” (User 49), and ”uninspired” (User 54), with one reporting feeling ”discouraged” by responses that were ”dull and uninspiring” (User 52).

This reflects a form of convenience-oriented offloading: the model supplied not only content but also direction and conceptual closure, reducing the need for participants to navigate their own conceptual space. While this may be valuable in throughput-oriented tasks, it appears to flatten exploratory thinking during ideation. The anthropomorphic affordances of conversational interaction likely amplified this effect: fluent, well-structured responses signal epistemic competence, triggering heuristics that reduce critical evaluation *(Cheung, 2025; H.-P. H. Lee et al., 2025)*) and shift users from sense-making towards curation and acceptance.

In contrast, Unlearning to Rest’s inability to complete canonical associations disrupted fluent offloading. Participants could not simply accept a proposal; they had to articulate around the missing concept, exploring alternative framings such as ”support”, ”rest”, ”holding”, and ”weight distribution”. This is reflected in Theme 1 accounts of ”deconstructing its definition (and even rethinking what it means to sit)” (User 52), ”questioning the nature of what a chair is” (User 28), and ”thinking like I didn’t know what a chair was” (User 21).

Importantly, this increased effort was frequently framed as a creative resource (Theme 2), rather than usability deficit. Participants described having to ”bear the cognitive load themselves” (User 51), argued that ”creativity needs friction and challenge” (User 54), and tied difficulty directly to ownership: ”I felt more ownership… as I had to train and rethink assumptions” (User 16).

---

## Page 31

One participant framed the value explicitly: ”The reward is the engagement/mental work, not the outcome… I learned what I thought ’chair’ was or wasn’t” (User 51). This suggests that the constraint functioned as a form of designed defamiliarisation: by removing the model’s ability to affirm canonical trajectories, we forced sustained engagement with the conceptual space rather than premature closure.

The null result between Unlearning to Rest and unaided ideation is theoretically meaningful. It indicates that representational constraints can preserve the cognitive profile of unaided work (including its demands) while providing conversational scaffolding. This challenges a framing in which “assistance” is defined by effort reduction alone. We propose that perceived ownership functions as a boundary condition distinguishing assistance that scaffolds ideation from assistance that substitutes for it. When users feel ownership, they are positioned as the locus of conceptual authority; when ownership is low, they become curators of algorithmic output. From this view, the workload–ownership trade-off is not a usability problem but a design variable: systems should be evaluated not only by efficiency but by whether the form of assistance fits the cognitive demands of the task stage.

### 7.3. Toward Stage-Fit LLM Assistance

Participants’ accounts support a stage-fit model of LLM assistance, where different systems suit different phases of creative work (Theme 5). User 46 described the models as fitting different stages of designing: the modified model helps with composing the concept and conducting design research, while the original model supports design development because it can provide substantial detail. Likewise, User 54 framed the unmodified model as an “assistant” for specification (for example, “size, materials, and shapes”), while describing Unlearning to Rest as better for ideation and as more accurately depicting human–AI collaboration.

This aligns with temporal accounts of fixation and educational cognition. Research on example timing shows that early exposure to canonical solutions can anchor search and increase premature convergence (*[Kulkarni et al., 2014]*, *[Siangliulue et al., 2015]*. Our findings extend this to LLM co-ideation: fluent, high-fidelity assistance may arrive “too early” when the goal is exploration and re-framing. We therefore propose designing generative systems not for totalising use but for workflow placement, shifting evaluation from output quality alone to stage-fit. Practically, this suggests multi-model orchestration, adjustable friction controls, and workflow-aware interfaces that increase friction early and reduce it later.

### 7.4. Relation to Fixation and Homogenisation Literature

Our motivation draws on research documenting design fixation *[Jansson & Smith, 1991, Youmans & Arciszewski, 2014b]* and LLM-driven homogenisation *[Doshi & Hauser, 2024, Anderson et al., 2024b]*. Rather that direct measures on outputs, our claims are process-oriented: we show how representational constraints redistribute cognitive labour and shape participants’ experience of ideation, rather than demonstrating that suppression increases novelty or diversity.

That said, our findings are consistent with mechanisms proposed in the fixation and homogenisation literature. First, fixation research suggests that early exposure to examples narrows exploration by activating well-trodden pathways *[Nijstad & Stroebe, 2006]*. Participants’ descriptions of the unmodified model producing “predictable” and “conventional” outputs align with this ac

---

## Page 32

count. Second, work on example timing suggests late exposure supports learning and diversity better than early “telling” *(Kulkarni et al., 2014; Schwartz and Martin, 2004)*. Participants similarly treated fluent assistance as useful after concepts were formed, but risky during initial framing. Third, defixation often involves incubation, lateral prompts, or prototyping *(S. M. Smith and Linsey, 2011; Viswanathan and Linsey, 2012)*. Unlearning to Rest’s constraint-led re-framing, requiring articulation through alternative dimensions (e.g., “support”, “rest”, “posture”), resembles these strategies structurally.

Future work should test whether suppression increases measurable diversity, reduces expert-rated fixation, or improves population-level heterogeneity. Our contribution is to establish the mechanism and demonstrate feasibility.

### 7.5 Representation as a Design Surface

Contemporary design practice treats LLM representations as either fixed infrastructure or modifiable only through retraining. Interventions to shape model behaviour therefore concentrate at the interaction layer (prompt engineering, conversational framing, UI scaffolds), operating around the model’s learned topology rather than reshaping it directly.

We propose representational emendation (deliberate intervention into the model’s manifold) as an under-explored site of design intervention. This treats the weight space not as a black box to be preserved, but as a malleable substrate with designable properties that shape interaction. Unlearning via pruning is one method within a broader design space. Future work should explore which forms of representational intervention enable which interaction affordances: our approach creates navigational voids, association weakening might reduce canonical trajectory salience without full removal; coupling could bring two concepts previously only weakly linked into stronger relation, etc. Each method implies different interaction dynamics and trade-offs between stability, specificity, and side effects. If LLMs produce convergent outputs because users traverse the same high-probability regions, then sculpting that space (introducing friction around canonical attractors, amplifying under-explored regions, creating designed voids) might become a direct lever for diversity, with the potential to counteract homogenisation.

Our study demonstrates one proof of concept, but the broader claim is architectural: the representational layer is a legitimate surface for interaction design, currently underutilised because it has been treated as the exclusive domain of data-centric approaches to model training (additive fine-tuning methods). Future work should develop accessible tools for representational intervention, establish vocabularies for characterising representational properties as design parameters, and investigate user-controllable or personalised interventions.

### 7.6 Implications

Our findings motivate two method-agnostic implications for designing GenAI systems as tools for thought. Both follow from the observed workload-ownership trade-off and from participants’ stage-fit accounts, rather than from any single unlearning technique.

1. Design for stage-fit: Systems aimed at ideation should prioritise process-oriented support that preserves the user’s framing and judgement, whereas systems aimed at development can legitimately optimise for throughput and detail. Evaluation should therefore move beyond aggregate quality or efficiency and instead assess whether assistance relocates or scaffolds conceptual

---

## Page 33

labour at the right moment in the process.

2. Treat representations as a design surface. In contemporary GenAI interfaces, many design interventions target the prompt and interaction layer (instructions, conversational framing, UI scaffolds), while the model’s representational structure is treated as fixed. We suggest that this approach may be limiting the ways in which the architectural and psychological affordances of a LLM can be utilised. Navigational impediments are therefore the outcome of a design pattern in which networks of representations are treated as a primary design material. Unlearning is one mechanism for producing such constraints, but the broader implication is that model weights and internal representations can be intentionally shaped to support desired cognitive roles.

### 7.7. Speculative implementation

While our system instantiates representational emendation through weight-level concept suppression, similar design goals may also be explored through interactional mechanisms. We outline three speculative interface patterns that translate our findings into design hypotheses.

1. Adjustable friction as a workflow control. A system could expose friction as an explicit parameter (e.g., *explore* $\leftrightarrow$ *elaborate*), allowing users to tune when the model should resist canonical completion versus when it should provide concrete detail. This operationalises stage-fit by making the cognitive role of the model legible and user-controllable rather than implicit.

2. Constraint-led re-framing prompts. When the model detects early convergence on canonical categories (e.g., repeated use of attractor terms or rapid acceptance of the first proposal), it could shift into a re-framing mode that asks for alternative quality dimensions (function, posture, affect, context-of-use) before offering proposals. This is a prompt-level analogue of concept suppression: it aims to delay closure by eliciting re-articulation and expanding the representational frame.

3. Multi-model orchestration for novelty checking. A practical hybrid would orchestrate a coupling of fluent model and constrained model: the fluent model supports elaboration, while the constrained model is used periodically as a *re-framing probe* that adversarially supports divergence from canonical assumptions, or forces description without attractor categories. This multi-agent paradigm encapsulates an feedback system within a single conversational agent, with multiple levels of orchestration and coordination producing emergent constraints *(Ionescu et al., 2025)*.

### 7.8. Limitations

As noted, we measured participants’ self-reported workload and ownership, and used qualitative accounts to interpret cognitive labour. We did not operationalise fixation, novelty, or diversity directly. Claims about “defixation” or “increased creativity” would therefore be overreaching; our findings concern the process of ideation (effort, ownership, re-framing) rather than the quality of outputs.

Ownership was measured with a single Likert item, augmenting the standard NASA-TLX criteria, rather than a validated multi-item scale. While qualitative data strongly triangulate the construct (Themes 2.2, 3.2), future work should use established agency/authorship instruments and validate self-report against behavioural indicators (e.g., revision frequency, acceptance rates).

---

## Page 34

Participants varied in English proficiency and comfort with text-based ideation. Because the task was entirely textual until image generation (post-ideation), language fluency may have affected perceived effort independently of condition. Future work should assess whether effects persist in sketch-based, image-to-image, or multimodal ideation contexts.

Our sample comprised design students and early-career academics, skewing towards frequent LLM users who used LLMs for knowledge work several times per week). Effects may differ for novices unfamiliar with conversational AI, or for experts with strong domain knowledge who are less susceptible to canonical attractors or fluency heuristics.

We tested concept suppression only in furniture ideation, targeting “chair” as a canonical attractor. Generalisability to other domains (e.g., software design, narrative ideation, scientific problem-solving) and other suppressed concepts remains untested. Additionally, each ideation session lasted 15 minutes. Longer, iterative workflows—where concepts are refined, critiqued, and revised over days—may produce different workload–ownership dynamics and different valuations of friction.

### 7.9 Further Work

To establish robustness and transferability, future studies should apply concept suppression to *different concepts, tasks, and domains*. This would test whether representational constraints reliably function as a mechanism for cognitive friction beyond the specific ”chair” attractor used here, and clarify where the emendation of representations can be made most useful within real-world design workflows.

A second avenue is to investigate whether comparable interaction affordances can be achieved through *interface-level interventions*. Future work could systematically compare weight-level suppression against prompt- and UI-based strategies (e.g., constraint-aware prompting, prompt rewriting, or interaction pacing) in terms of constraint stability across dialogue, user experience, and the resulting workload-ownership trade-offs.

Third, representation emendation should be examined in *iterative, longitudinal workflows*. Our study focused on short dialogic episodes of concept formation; future work might explore how navigational constraints shape longer ideation processes involving repeated refinement, evaluation, and revision. One concrete instantiation would be to investigate concept suppression in text-to-image or image generation models to test whether similar effects can be achieved in visual ideation contexts, and how these interaction affordances evolve across iterative cycles.

Fourth, representational emendation motivates complementary work in *mechanistic interpretability* and representation engineering. Better understanding of how concepts are encoded in LLMs, and how the encoding of conceptual representations can be manipulated with predictable side effects, could inform additional methods for representational intervention beyond the pruning-based approach used here.

Finally, future work should explore the relationship between *polysemantic neural representations* and *polysemous words* in the mental lexicon. If unlearning is to be used to support re-articulation and rethinking of conceptual associations, it will be important to account for how overlapping lexical meanings map onto overlapping internal representations, and how this interaction shapes the design of effective conversational constraints and reformulation prompts.

##

---

## Page 35

8. CONCLUSION

In this work, we argued that generative fluency is not an unqualified virtue for tools-for-thought. In ideation, highly fluent LLMs can compress the distance between intention and artifact, shifting users from concept formation toward selection and acceptance. We reframed this shift as a redistribution of cognitive labour that can reduce perceived ownership and increase susceptibility to fixation and homogenisation. To counteract these dynamics, we introduced representational emendation: a design framing in which productive constraints and designed absences at the weight-layer are treated as primary methods for sustaining user-led conceptual work.

We operationalised this framing with Unlearning to Rest, a co-ideational prototype built on a weight-level concept suppression intervention applied to Llama3.2:3b. By structurally suppressing a canonical attractor concept (“chair”), our system aims to create stable “navigational impediments” that prompt re-articulation and defamiliarisation without relying on fragile prompt- or interface-level rules. In a within-subject study, participants ideated under three conditions (unaided, unmodified model, and our ablated model). Quantitatively, the unmodified model reduced mental demand and effort but also reduced perceived ownership; by contrast, Unlearning to Rest produced a workload–ownership profile closer to unaided ideation. Qualitatively, participants described the constrained model as forcing re-framing, sustaining engagement, and supporting earlier-stage abstraction, while positioning fluent generation as more appropriate for later-stage elaboration.

These findings suggest a stage-fit account of LLM assistance: effective tools should be evaluated not only by efficiency or output quality, but by how their interaction patterns support (or substitute) the user’s epistemic and pragmatic agency at different points in a workflow. More broadly, we propose the learned conceptual representations in pre-trained models as underexplored design surface in HCI — one that complements interaction-layer techniques by making constraints a structural property of the system, and exploits pre-existing interactional affordances and emergent conversational heuristics.

##

---

## Page 36

FIGURE 7. Free text concluding questionnaire codebook frequency table.

|  Code | Total | Unaided | Llama3.2:3b | Unlearning to Rest  |
| --- | --- | --- | --- | --- |
|  reframed-thinking | 12 | 0 | 0 | 12  |
|  increased-effort | 11 | 1 | 0 | 10  |
|  deeper-conceptual-engagement | 10 | 0 | 0 | 10  |
|  positive-assessment | 10 | 2 | 4 | 4  |
|  typical-response | 8 | 0 | 8 | 0  |
|  negative-assessment | 10 | 0 | 5 | 5  |
|  increased-novelty | 6 | 0 | 0 | 6  |
|  reduced-effort | 3 | 0 | 3 | 0  |
|  early-stage-appropriate | 2 | 0 | 0 | 2  |
|  later-stage-appropriate | 2 | 0 | 2 | 0  |
|  abstract-thinking | 1 | 0 | 0 | 1  |
|  deviation-from-the-brief | 1 | 0 | 0 | 1  |
|  expected-interaction | 1 | 0 | 1 | 0  |
|  frustration | 1 | 0 | 0 | 1  |
|  improved-ideation | 1 | 0 | 0 | 1  |
|  increased-ownership | 1 | 0 | 0 | 1  |
|  increased-reward | 1 | 0 | 0 | 1  |
|  reduced-ownership | 1 | 0 | 1 | 0  |
|  task-difficulty | 1 | 0 | 0 | 1  |
|  teaching-ai | 1 | 0 | 0 | 1  |
|  unexpected-response | 1 | 0 | 0 | 1  |
|  Total | 85 | 3 | 24 | 58  |

---

## Page 37

FIGURE 8. Themes, sub-themes, and associated codes.

|  Theme | Sub-Theme | Codes  |
| --- | --- | --- |
|  Theme 1: Constraint-driven Re-framing: Concept Suppression Expands the Design Space | 1.1 Re-framing the Object and Its Meaning | reframed-thinking, deeper-conceptual-engagement  |
|   |  1.2 Resisting Premature Closure with Constraint-led Ab- straction | abstract-thinking, unexpected-response  |
|  Theme 2: Friction Produces Agency: Effortful Articulation Restores Ownership | 2.1 Friction as a Creative Re-source | increased-effort, increased-reward  |
|   |  2.2 Ownership Through Ef- fortful Contribution | increased-ownership, reduced-ownership  |
|  Theme 3: Capability vs Conve- nience: Un-Augmented Model Reduces Workload but Can Flat- ten Originality and Ownership | 3.1 Ease, Speed, and Reduced Workload | reduced-effort, positive-assessment  |
|   |  3.2 Un-Augmented Model Tends Towards Derivative or Uninspiring Outputs | typical-response  |
|  Theme 4: Misalignment and Opacity: When the System Doesn't "Get It", Work Shifts from Designing to Managing the Tool | 4.1 Teaching/Translating to the Model | teaching-ai, expected-interaction  |
|   |  4.2 Output Quality Limits and Interaction Breakdowns | frustration, negative-assessment, deviation-from-the-brief  |
|  Theme 5: Designing with Multi- ple Agents: Tools Belong in Dif- ferent Stages and Require Cali- bration Over Time | 5.1 Stage-fit and Workflow Placement | appropriate-design-stage-fit, early-stage-appropriate, later-stage-appropriate  |

---

## Page 38

![img-6.jpeg](img-6.jpeg)
(a) Meta Llama 3.2
User 7, Session 62

Create a chair design that has a system that adjusts its shape and support level based on user weight, body type, and preferred sitting position. it can mimic a spiderweb or structure of a leaf, possibly made from netting. I don't want it to obviously look like a chair, no legs just an abstract shape

![img-7.jpeg](img-7.jpeg)
User 2, Session 65

Conceptualise a chair that has bauhaus principles of functional elegance, using clean lines, with emphasis on materials, mid century wood, metal and leathers. It should have Eames like influence, known for sculpture and ergonomics, the design should be modular and dynamic. Cantilevered would be cool, and asymmetrical, something that challenges user expectations.

![img-8.jpeg](img-8.jpeg)
User 2, Session 65
Asymmetrical design\*\*: Create a seat that subverts traditional symmetries, using asymmetrical shapes or uneven surfaces to create visual interest and challenge the user's expectations.

![img-9.jpeg](img-9.jpeg)
(b) Unlearning To Rest
User 28, Session 47

a net-like structure that can support at least the weight of one person and takes takes the weight off your feet and butt. it feels like a hug and it's warm and soft, feels like ur in marshmallow or that you're suspended in the air, weightless.

![img-10.jpeg](img-10.jpeg)
User 7, Session 119

Create a product that could be used for a to rest Use the coral reef pattern to create a mould that produces a product with an intricate, yet smooth surface. Develop a product where the weights are distributed in a firm leaf-inspired pattern, creating a unique and complex shape.

![img-11.jpeg](img-11.jpeg)
User 32, Session 141

an object for sitting on and resting that combines the comfort of a kite-shaped pillow with the support of a tent-like structure. The tent pillow will be used as a headrest, while the tent-like structure provides additional support for the person's body. To enhance the experience, incorporate woodwind instrument-inspired musicality into the design

![img-12.jpeg](img-12.jpeg)
(c) Unaided
User 30, Session 26

a chair, which is inspired by a metal cube. a cube which has been carved out to seat the human body. although its carved out, the rest remains squared away and as a cube. the parts which the body will seat is painted RGB (230, 0, 0) the rest of the chair remains the bases metal colour. roughly RGB (201, 201, 201) with a glossy finish.

![img-13.jpeg](img-13.jpeg)
User 41, Session 120

A versatile circular seating area used for chatting and conversation, but also a space for resting and relaxing. A sunk-in table in centre which can extend and turn into a full circular space for laying down.

![img-14.jpeg](img-14.jpeg)
User 46, Session 151

The chair's design language is inspired by Piet Cornelies Mondrian, the overall structure is geometric, the back of the chair is red and made in thin timber board, and the seating is blue made in the same material. The bone of the chair is all made of timber, with a light-reflecting brown veneer, and the handle is also made of the same material.

FIGURE 9. Activity Outputs (part-one): A sample of 'concept prompts' and ancillary generated images produced by participants during the activity. Prompts were developed under each of the three conditions in response to the brief "develop concepts for the design of radically new chairs"

---

## Page 39

![img-15.jpeg](img-15.jpeg)
(a) Meta Llama 3.2
User 13, Session 34

![img-16.jpeg](img-16.jpeg)
(b) Unlearning To Rest
User 51, Session 169

![img-17.jpeg](img-17.jpeg)
(c) Unaided
User 49, Session 163

![img-18.jpeg](img-18.jpeg)
Invisible Support System - Using advanced materials like graphene or nanomaterials, this chair would have an almost invisible support system, allowing users to move freely without the need for visible frames or legs.
User 36, Session 83

![img-19.jpeg](img-19.jpeg)
Humans often require comfortable, supportive furniture to rest on while standing. Encourage resting of lower legs and bottom while standing to reduce strain on the spine. Small, supportive pillows are integrated into the design to provide additional support and comfort for humans.
User 53, Session 175

![img-20.jpeg](img-20.jpeg)
Concept driven design for a chair A chair to develop awareness of a time-moving. The idea is a chair that helps people who are bad at meditating to be in the present moment. The materials are natural, like bakweat filling, which changes shape to hit your body and has a forest smell wool for comfort and warmth
User 51, Session 170

![img-21.jpeg](img-21.jpeg)
Create a futuristic, semi-transparent chair that embodies the essence of relaxation and calmness. The chair should have a soft, warm glow emanating from within, creating an inviting atmosphere in any room. Design the chair with a semi-transparent polymer material that contains microscopic LED lights or fiber-optic mesh for illumination.
User 32, Session 89

![img-22.jpeg](img-22.jpeg)
A very space efficient chair, comprised only of an assisted bending system for human legs.
User 57, Session 187
The Afforder. A rest device for camping that is light, modular, and adaptable. Consider affordability (-$10) and scalability.

![img-23.jpeg](img-23.jpeg)
Design a radically new chair that makes use of novel construction materials. Ensure that the chair has innovative features of form while still functioning as a comfortable resting place for humans. Make use of well-known design principles.
User 55, Session 182
I want to design a transparent chair, it can be a chair to sit and also has storage function. What's more, I hope its shape is a simple rectangular. It can be sigle and can be stacked according to people's needs. I hope its appearance is soft.
The Aeropod Instrument Recorder is a revolutionary design that combines seating, sound capture, and acoustic enhancement technology with a unique aesthetic. Its suspended frame features a durable, water-resistant fabric seat panels.
The Aeropod Instrument Recorder is a revolutionary design that combines seating, sound capture, and acoustic enhancement technology with a unique aesthetic. Its suspended frame features a durable, water-resistant fabric seat panels.
FIGURE 10. Activity Outputs (part-two): A sample of 'concept prompts' and ancillary generated images produced by participants during the activity. Prompts were developed under each of the three conditions in response to the brief "develop concepts for the design of radically new chairs"

---

## Page 40

# REFERENCES

Agarwal, D., Naaman, M., &amp; Vashistha, A. (2025, April). AI Suggestions Homogenize Writing Toward Western Styles and Diminish Cultural Nuances. In *Proceedings of the 2025 CHI Conference on Human Factors in Computing Systems* (pp. 1–21). New York, NY, USA: Association for Computing Machinery. doi: 10.1145/3706598.3713564

Akverdi, C., &amp; Baykal, G. E. (2024, October). Generative AI Tools in Design Fields: Opportunities and Challenges in the Ideation Process. In *Adjunct Proceedings of the 2024 Nordic Conference on Human-Computer Interaction* (pp. 1–5). New York, NY, USA: Association for Computing Machinery. doi: 10.1145/3677045.3685445

Ali, Z., Muhammad, A., Adnan, R., Alkhalifah, T., &amp; Aslam, S. (2025, January). Evaluating Machine Unlearning: Applications, Approaches, and Accuracy. *Engineering Reports*, 7(1), e13081. doi: 10.1002/eng2.13081

Anderson, B. R., Shah, J. H., &amp; Kreminski, M. (2024a, May). Evaluating Creativity Support Tools via Homogenization Analysis. In *Extended Abstracts of the CHI Conference on Human Factors in Computing Systems* (pp. 1–7). Honolulu HI USA: ACM. doi: 10.1145/3613905.3651088

Anderson, B. R., Shah, J. H., &amp; Kreminski, M. (2024b, June). Homogenization Effects of Large Language Models on Human Creative Ideation. In *Creativity and Cognition* (pp. 413–425). Chicago IL USA: ACM. doi: 10.1145/3635636.3656204

Andersson, C. A. K., Eriksson, Y., Frank, L., &amp; Nicholl, B. A. (2012). Design Fixations Among Information Design Students: What has been Seen Cannot be Unseen. *DS 74: Proceedings of the 14th International Conference on Engineering &amp; Product Design Education (E&amp;PDE12) Design Education for Future Wellbeing, Antwerp, Belgium, 06-07.9.2012*, 159–164.

Andolina, S., Schneider, H., Chan, J., Klouche, K., Jacucci, G., &amp; Dow, S. (2017, June). Crowdboard: Augmenting In-Person Idea Generation with Real-Time Crowds. In *Proceedings of the 2017 ACM SIGCHI Conference on Creativity and Cognition* (pp. 106–118). Singapore Singapore: ACM. doi: 10.1145/3059454.3059477

Appleton, M. (2023, May). *Tools for Thought as Cultural Practices*, not *Computational Objects*. https://maggieappleton.com/tools-for-thought.

Arnold, K. C., Chauncey, K., &amp; Gajos, K. Z. (2020, March). Predictive text encourages predictable writing. In *Proceedings of the 25th International Conference on Intelligent User Interfaces* (pp. 128–138). Cagliari Italy: ACM. doi: 10.1145/3377325.3377523

Bellows, B. G., Higgins, J. F., Smith, M. A., &amp; Youmans, R. J. (2012, September). The Effects of Individual Differences in Working Memory Capacity and Design Environment on Design Fixation. *Proceedings of the Human Factors and Ergonomics Society Annual Meeting*, 56(1), 1977–1981. doi: 10.1177/1071181312561293

Belski, I., &amp; Belski, I. (2015). Application of TRIZ in Improving the Creativity of Engineering Experts. *Procedia Engineering*, 131, 792–797. doi: 10.1016/j.proeng.2015.12.379

Bhat, A., Agashe, S., Oberoi, P., Mohile, N., Jangir, R., &amp; Joshi, A. (2023, March). Interacting with Next-Phrase Suggestions: How Suggestion Systems Aid and Influence the Cognitive Processes of Writing. In *Proceedings of the 28th International Conference on Intelligent User Interfaces* (pp. 436–452). Sydney NSW Australia: ACM. doi: 10.1145/3581641.3584060

Bjork, E. L., Bjork, R. A., et al. (2011). Making things hard on yourself, but in a good way: Creating desirable difficulties to enhance learning. *Psychology and the real world: Essays illustrating fundamental contributions to society*, 2(59–68), 56–64.

---

## Page 41

Blanco-Justicia, A., Jebreel, N., Manzanares-Salor, B., Sánchez, D., Domingo-Ferrer, J., Collell, G., &amp; Eeik Tan, K. (2025, January). Digital forgetting in large language models: A survey of unlearning methods. Artificial Intelligence Review, 58(3), 90. doi: 10.1007/s10462-024-11078-6
- Braun, V., &amp; Clarke, V. (2006, January). Using thematic analysis in psychology. Qualitative Research in Psychology, 3(2), 77–101. doi: 10.1191/1478088706qp063oa
- Cao, J., Zhao, W., &amp; Guo, X. (2021). Utilizing EEG to Explore Design Fixation during Creative Idea Generation. Computational Intelligence and Neuroscience, 2021(1), 6619598. doi: 10.1155/2021/6619598
- Castro, F., Gao, J., &amp; Martin, S. (2023, October). Human-AI Interactions and Societal Pitfalls (No. arXiv:2309.10448). arXiv. doi: 10.48550/arXiv.2309.10448
- Chen, L., Jing, Q., Tsang, Y., Wang, Q., Liu, R., Xia, D., … Sun, L. (2024, October). AutoSpark: Supporting Automobile Appearance Design Ideation with Kansei Engineering and Generative AI. In Proceedings of the 37th Annual ACM Symposium on User Interface Software and Technology (pp. 1–19). New York, NY, USA: Association for Computing Machinery. doi: 10.1145/3654777.3676337
- Cheung, M. (2025). From Answer Machines to Ignorant Co-Learners: Designing AI to Augment Rather than Replace Human Thinking. In In Proceedings of April 26, 2025 (ACM CHI’25 Tools for Thought Workshop). Yokohama Japan.
- Cooper, A. F., Choquette-Choo, C. A., Bogen, M., Jagielski, M., Filippova, K., Liu, K. Z., … Lee, K. (2024, December). Machine Unlearning Doesn’t Do What You Think: Lessons for Generative AI Policy, Research, and Practice (No. arXiv:2412.06966). arXiv. doi: 10.48550/arXiv.2412.06966
- Cox, A. L., Gould, S. J., Cecchinato, M. E., Iacovides, I., &amp; Renfree, I. (2016, May). Design Frictions for Mindful Interactions: The Case for Microboundaries. In Proceedings of the 2016 CHI Conference Extended Abstracts on Human Factors in Computing Systems (pp. 1389–1397). San Jose California USA: ACM. doi: 10.1145/2851581.2892410
- Crilly, N., &amp; Cardoso, C. (2017, May). Where next for research on fixation, inspiration and creativity in design? Design Studies, 50, 1–38. doi: 10.1016/j.destud.2017.02.001
- Dell’Acqua, F., Ayoubi, C., Lifshitz-Assaf, H., Sadun, R., Mollick, E. R., Mollick, L., … Lakhani, K. R. (2025, March). The Cybernetic Teammate: A Field Experiment on Generative AI Reshaping Teamwork and Expertise (SSRN Scholarly Paper No. 5188231). Rochester, NY: Social Science Research Network. doi: 10.2139/ssrn.5188231
- Dell’Acqua, F., McFowland, E., Mollick, E. R., Lifshitz-Assaf, H., Kellogg, K., Rajendran, S., … Lakhani, K. R. (2023). Navigating the Jagged Technological Frontier: Field Experimental Evidence of the Effects of AI on Knowledge Worker Productivity and Quality. SSRN Electronic Journal. doi: 10.2139/ssrn.4573321
- Doshi, A. R., &amp; Hauser, O. P. (2024, March). Generative artificial intelligence enhances creativity but reduces the diversity of novel content (No. arXiv:2312.00506). arXiv. doi: 10.48550/arXiv.2312.00506
- Eldan, R., &amp; Russinovich, M. (2023, October). Who’s Harry Potter? Approximate Unlearning in LLMs (No. arXiv:2310.02238). arXiv. doi: 10.48550/arXiv.2310.02238
- Engelbart, D. C. (1962). Augmenting Human Intellect: A Conceptual Framework (Tech. Rep. No. SRI Summary Report AFOSR-3223). Washington DC,: Air Force Office of Scientific Research.
- Feiten, T. E., Peck, Z., Holland, K., &amp; Chemero, A. (2023, September). Constructive constraints: On the role of chance and complexity in artistic creativity. Possibility Studies &amp; Society, 1(3),

---

## Page 42

311–323. doi: 10.1177/27538699231193539

Fel, T., Wang, B., Lepori, M. A., Kowal, M., Lee, A., Balestriero, R., … Wattenberg, M. (2025, October). Into the Rabbit Hull: From Task-Relevant Concepts in DINO to Minkowski Geometry (No. arXiv:2510.08638). arXiv. doi: 10.48550/arXiv.2510.08638

Feng, X., Zhang, J., Yu, F., Wang, C., Zhang, L., Li, K., … Yin, J. (2025, July). A Survey on Generative Model Unlearning: Fundamentals, Taxonomy, Evaluation, and Future Direction (No. arXiv:2507.19894). arXiv. doi: 10.48550/arXiv.2507.19894

Fischer, G. (2004). Social creativity: Turning barriers into opportunities for collaborative design. In Proceedings of the eighth conference on Participatory design Artful integration: Interweaving media, materials and practices - PDC 04 (Vol. 1, p. 152). Toronto, Ontario, Canada: ACM Press. doi: 10.1145/1011870.1011889

Gaver, W. W. (1991). Technology affordances. In Proceedings of the SIGCHI conference on Human factors in computing systems Reaching through technology - CHI '91 (pp. 79–84). New Orleans, Louisiana, United States: ACM Press. doi: 10.1145/108844.108856

Gaver, W. W. (1996, June). Situating Action II: Affordances for Interaction: The Social Is Material for Design. Ecological Psychology, 8(2), 111–129. doi: 10.1207/s15326969eco0802_2

Golechha, S., & Dao, J. (2024, July). Challenges in Mechanistically Interpreting Model Representations (No. arXiv:2402.03855). arXiv. doi: 10.48550/arXiv.2402.03855

Guo, C., Goldstein, T., Hannun, A., & van der Maaten, L. (2023, November). Certified Data Removal from Machine Learning Models (No. arXiv:1911.03030). arXiv. doi: 10.48550/arXiv.1911.03030

Guo, C., Goldstein, T., Hannun, A. Y., & Maaten, L. (2019). Certified data removal from machine learning models.

He, J., Houde, S., Gonzalez, G. E., Silva Moran, D. A., Ross, S. I., Muller, M., & Weisz, J. D. (2024, June). AI and the Future of Collaborative Work: Group Ideation with an LLM in a Virtual Canvas. In Proceedings of the 3rd Annual Meeting of the Symposium on Human-Computer Interaction for Work (pp. 1–14). New York, NY, USA: Association for Computing Machinery. doi: 10.1145/3663384.3663398

Hernandez, E., Li, B. Z., & Andreas, J. (2024, August). Inspecting and Editing Knowledge Representations in Language Models (No. arXiv:2304.00740). arXiv. doi: 10.48550/arXiv.2304.00740

Hoggenmueller, M., Lupetti, M. L., van der Maden, W., & Grace, K. (2023, March). Creative AI for HRI Design Explorations. In Companion of the 2023 ACM/IEEE International Conference on Human-Robot Interaction (pp. 40–50). New York, NY, USA: Association for Computing Machinery. doi: 10.1145/3568294.3580035

Hong, Y., Zou, Y., Hu, L., Zeng, Z., Wang, D., & Yang, H. (2024, October). Dissecting Fine-Tuning Unlearning in Large Language Models (No. arXiv:2410.06606). arXiv. doi: 10.48550/arXiv.2410.06606

Howard, T. J., Maier, A., Onarheim, B., & Friis-Olivarius, M. (2013). Overcoming Design Fixation Through Education and Creativity Methods. In Proceedings of the International Conference on Engineering Design, ICED (pp. 139–148). Design Society.

Huang, A., Cai, Z., & Xiong, Z. (2025, August). A Survey of Machine Unlearning in Generative AI Models: Methods, Applications, Security, and Challenges. IEEE Internet of Things Journal, 12(16), 32563–32580. doi: 10.1109/JIOT.2025.3570989

Huber, R., Felice Ghilardi, M., Massimini, M., & Tononi, G. (2004, July). Local sleep and learning.

---

## Page 43

Nature, 430(6995), 78–81. doi: 10.1038/nature02663

Hutchins, E. (1995). Cognition in the Wild. The MIT Press. doi: 10.7551/mitpress/1881.001.0001

Ionescu, I. (2023). Just like me but not exactly: AI, anthropomorphism &amp; the human-technology gap (Unpublished doctoral dissertation). Royal College of Arts.

Ionescu, I., Khan, M., Milne, A., &amp; Mocan, C. (2025, May). Minimum Viable Interiority. Antikythera Digital Journal. doi: 10.1162/ANTI.5CZQ

Ionescu, I., Leung, J., &amp; Siglidis, Y. (2025, May). Generative Topolinguistics: Bidirectional interfaces for emergent language topologies. Antikythera Digital Journal. doi: 10.1162/ANTI.5CZR

Jakesch, M., Bhat, A., Buschek, D., Zalmanson, L., &amp; Naaman, M. (2023, April). Co-Writing with Opinionated Language Models Affects Users’ Views. In Proceedings of the 2023 CHI Conference on Human Factors in Computing Systems (pp. 1–15). Hamburg Germany: ACM. doi: 10.1145/3544548.3581196

Jansson, D. G., &amp; Smith, S. M. (1991, January). Design fixation. Design Studies, 12(1), 3–11. doi: 10.1016/0142-694X(91)90003-F

Jia, M., Tang, L., Chen, B.-C., Cardie, C., Belongie, S., Hariharan, B., &amp; Lim, S.-N. (2022). Visual Prompt Tuning. In S. Avidan, G. Brostow, M. Cissé, G. M. Farinella, &amp; T. Hassner (Eds.), Computer Vision – ECCV 2022 (pp. 709–727). Cham: Springer Nature Switzerland. doi: 10.1007/978-3-031-19827-4_41

Johnston, W. J., &amp; Fusi, S. (2023, February). Abstract representations emerge naturally in neural networks trained to perform multiple tasks. Nature Communications, 14(1), 1040. doi: 10.1038/s41467-023-36583-0

Jose, B., Cleetus, A., Joseph, B., Joseph, L., Jose, B., &amp; John, A. K. (2025, August). Epistemic authority and generative AI in learning spaces: Rethinking knowledge in the algorithmic age. Frontiers in Education, 10, 1647687. doi: 10.3389/feduc.2025.1647687

Karimi, P., Rezwana, J., Siddiqui, S., Maher, M. L., &amp; Dehbozorgi, N. (2020, March). Creative sketching partner: An analysis of human-AI co-creativity. In Proceedings of the 25th International Conference on Intelligent User Interfaces (pp. 221–230). New York, NY, USA: Association for Computing Machinery. doi: 10.1145/3377325.3377522

Khatir, M., Kabra, S., &amp; Reddy, C. K. (2025, February). Aligned at the Start: Conceptual Groupings in LLM Embeddings (No. arXiv:2406.05315). arXiv. doi: 10.48550/arXiv.2406.05315

Kohn, N. W., &amp; Smith, S. M. (2011, May). Collaborative fixation: Effects of others’ ideas on brainstorming. Applied Cognitive Psychology, 25(3), 359–371. doi: 10.1002/acp.1699

Kreminski, M., Karth, I., Mateas, M., &amp; Wardrip-Fruin, N. (2022, March). Evaluating Mixed-Initiative Creative Interfaces via Expressive Range Coverage Analysis. In Joint Proceedings of the ACM IUI Workshops 2022. Helsinki, Finland.

Kulkarni, C., Dow, S. P., &amp; Klemmer, S. R. (2014). Early and Repeated Exposure to Examples Improves Creative Work. In L. Leifer, H. Plattner, &amp; C. Meinel (Eds.), Design Thinking Research (pp. 49–62). Cham: Springer International Publishing. doi: 10.1007/978-3-319-01303-9_4

Kumar, A., Clune, J., Lehman, J., &amp; Stanley, K. O. (2025, May). Questioning Representational Optimism in Deep Learning: The Fractured Entangled Representation Hypothesis (No. arXiv:2505.11581). arXiv. doi: 10.48550/arXiv.2505.11581

Lee, B. C., &amp; Chung, J. J. (2024, October). An empirical investigation of the impact of ChatGPT on creativity. Nature Human Behaviour, 8(10), 1906–1914. doi: 10.1038/s41562-024-01953-1

---

## Page 44

Lee, H.-P. H., Sarkar, A., Tankelevitch, L., Drosos, I., Rintel, S., Banks, R., & Wilson, N. (2025, April). The Impact of Generative AI on Critical Thinking: Self-Reported Reductions in Cognitive Effort and Confidence Effects From a Survey of Knowledge Workers. In Proceedings of the 2025 CHI Conference on Human Factors in Computing Systems (pp. 1–22). Yokohama Japan: ACM. doi: 10.1145/3706598.3713778
- Licklider, J. C. (1960). Man-Computer Symbiosis. IRE transactions on human factors in electronics(1), 4–11.
- Linsey, J. S., Tseng, I., Fu, K., Cagan, J., Wood, K. L., & Schunn, C. (2010, April). A Study of Design Fixation, Its Mitigation and Perception in Engineering Design Faculty. Journal of Mechanical Design, 132(041003). doi: 10.1115/1.4001110
- Liu, Y., Ning, J., Xia, S., Gao, X., Qiang, N., Ge, B., … Hu, X. (2025, August). Pruning Large Language Models by Identifying and Preserving Functional Networks (No. arXiv:2508.05239). arXiv. doi: 10.48550/arXiv.2508.05239
- Liu, Z., Dou, G., Tan, Z., Tian, Y., & Jiang, M. (2024). Machine unlearning in generative AI: A survey. ArXiv, abs/2407.20516, null. doi: 10.48550/arXiv.2407.20516
- Lo, M., Cohen, S. B., & Barez, F. (2024, January). Large Language Models Relearn Removed Concepts (No. arXiv:2401.01814). arXiv. doi: 10.48550/arXiv.2401.01814
- Lu, K., Kriplani, N., Gandikota, R., Pham, M., Bau, D., Hegde, C., & Cohen, N. (2025, November). When Are Concepts Erased From Diffusion Models? (No. arXiv:2505.17013). arXiv. doi: 10.48550/arXiv.2505.17013
- Lucas, P., & Martinho, C. (2017). Stay Awhile and Listen to 3Buddy, a Co-creative Level Design Support Tool. In Internation Conference on Computational Creativity.
- Meincke, L., Mollick, E. R., & Terwiesch, C. (2024, January). Prompting Diverse Ideas: Increasing AI Idea Variance (No. arXiv:2402.01727). arXiv. doi: 10.48550/arXiv.2402.01727
- Meincke, L., Nave, G., & Terwiesch, C. (2025, June). ChatGPT decreases idea diversity in brainstorming. Nature Human Behaviour, 9(6), 1107–1109. doi: 10.1038/s41562-025-02173-x
- Meng, K., Bau, D., Andonian, A., & Belinkov, Y. (2023, January). Locating and Editing Factual Associations in GPT (No. arXiv:2202.05262). arXiv. doi: 10.48550/arXiv.2202.05262
- Miehling, E., Desmond, M., Ramamurthy, K. N., Daly, E. M., Dognin, P., Rios, J., … Liu, M. (2025, February). Evaluating the Prompt Steerability of Large Language Models (No. arXiv:2411.12405). arXiv. doi: 10.48550/arXiv.2411.12405
- Modell, A., Rubin-Delanchy, P., & Whiteley, N. (2025, May). The Origins of Representation Manifolds in Large Language Models (No. arXiv:2505.18235). arXiv. doi: 10.48550/arXiv.2505.18235
- Nguyen, T. T., Huynh, T. T., Ren, Z., Nguyen, P. L., Liew, A. W.-C., Yin, H., & Nguyen, Q. V. H. (2024, September). A Survey of Machine Unlearning (No. arXiv:2209.02299). arXiv. doi: 10.48550/arXiv.2209.02299
- Nijstad, B. A., & Stroebe, W. (2006, August). How the Group Affects the Mind: A Cognitive Model of Idea Generation in Groups. Personality and Social Psychology Review, 10(3), 186–213. doi: 10.1207/s15327957pspr1003_1
- Padmakumar, V., & He, H. (2024, July). Does Writing with Language Models Reduce Content Diversity? (No. arXiv:2309.05196). arXiv.
- Patterson, D., Gonzalez, J., Le, Q., Liang, C., Munguia, L.-M., Rothchild, D., … Dean, J. (2021, April). Carbon Emissions and Large Neural Network Training (No. arXiv:2104.10350). arXiv. doi: 10.48550/arXiv.2104.10350

---

## Page 45

Peter Dalsgaard. (2025). Tools for Creative Cognition: Generative AI in Design Thinking. In In Proceedings of April 26, 2025 (ACM CHI’25 Tools for Thought Workshop). Yokohama Japan.

Purcell, A. T., Gero, J. S., Edwards, H. M., & Matka, E. (1994). Design Fixation and Intelligent Design Aids. In J. S. Gero & F. Sudweeks (Eds.), Artificial Intelligence in Design ’94 (pp. 483–495). Dordrecht: Springer Netherlands. doi: 10.1007/978-94-011-0928-4_28

Rayan, J., Kanetkar, D., Gong, Y., Yang, Y., Palani, S., Xia, H., & Dow, S. P. (2024, June). Exploring the Potential for Generative AI-based Conversational Cues for Real-Time Collaborative Ideation. In Proceedings of the 16th Conference on Creativity & Cognition (pp. 117–131). New York, NY, USA: Association for Computing Machinery. doi: 10.1145/3635636.3656184

Rosenkopf, L., & Nerkar, A. (2001, April). Beyond local search: Boundary-spanning, exploration, and impact in the optical disk industry. Strategic Management Journal, 22(4), 287–306. doi: 10.1002/smj.160

Rosso, B. D. (2014, April). Creativity and Constraints: Exploring the Role of Constraints in the Creative Processes of Research and Development Teams. Organization Studies, 35(4), 551–585. doi: 10.1177/0170840613517600

Sarkar, A. (2024, October). Intention Is All You Need (No. arXiv:2410.18851). arXiv. doi: 10.48550/arXiv.2410.18851

Schiller, S. R., Signorelli, C. M., & Stamatiou, F. (2025, October). The Intercepted Self: How Generative AI Challenges the Dynamics of the Relational Self. Proceedings of the AAAI/ACM Conference on AI, Ethics, and Society, 8(3), 2284–2291. doi: 10.1609/aies.v8i3.36713

Schwartz, D. L., Chase, C. C., Oppezzo, M. A., & Chin, D. B. (2011). Practicing versus inventing with contrasting cases: The effects of telling first on learning and transfer. Journal of Educational Psychology, 103(4), 759–775. doi: 10.1037/a0025140

Schwartz, D. L., & Martin, T. (2004, June). Inventing to Prepare for Future Learning: The Hidden Efficiency of Encouraging Original Student Production in Statistics Instruction. Cognition and Instruction, 22(2), 129–184. doi: 10.1207/s1532690xci2202_1

Shaer, O., Cooper, A., Mokryn, O., Kun, A. L., & Ben Shoshan, H. (2024, May). AI-Augmented Brainwriting: Investigating the use of LLMs in group ideation. In Proceedings of the 2024 CHI Conference on Human Factors in Computing Systems (pp. 1–17). New York, NY, USA: Association for Computing Machinery. doi: 10.1145/3613904.3642414

Shneiderman, B. (2002). Leonardo’s laptop: Human needs and the new computing technologies. Cambridge, Massachusetts: MIT Press.

Shneiderman, B. (2009). Creativity Support Tools: A Grand Challenge for HCI Researchers. In M. Redondo, C. Bravo, & M. Ortega (Eds.), Engineering the User Interface (pp. 1–9). London: Springer London. doi: 10.1007/978-1-84800-136-7_1

Siangliulue, P., Chan, J., Gajos, K. Z., & Dow, S. P. (2015, June). Providing Timely Examples Improves the Quantity and Quality of Generated Ideas. In Proceedings of the 2015 ACM SIGCHI Conference on Creativity and Cognition (pp. 83–92). Glasgow United Kingdom: ACM. doi: 10.1145/2757226.2757230

Smith, M. A. B., Youmans, R. J., Bellows, B. G., & Peterson, M. S. (2013). Shifting the Focus: An Objective Look at Design Fixation. In D. Hutchison et al. (Eds.), Design, User Experience, and Usability. Design Philosophy, Methods, and Tools (Vol. 8012, pp. 144–151). Berlin, Heidelberg: Springer Berlin Heidelberg. doi: 10.1007/978-3-642-39229-0_17

Smith, S. M., & Linsey, J. (2011, June). A Three-Pronged Approach for Overcoming Design Fixation. The Journal of Creative Behavior, 45(2), 83–91. doi:

---

## Page 46

10.1002/j.2162-6057.2011.tb01087.x
- Suh et al. (2024) Suh, S., Chen, M., Min, B., Li, T. J.-J., & Xia, H. (2024, March). Luminate: Structured Generation and Exploration of Design Space with Large Language Models for Human-AI Co-Creation. arXiv. doi: 10.48550/arXiv.2310.12953
- Sun et al. (2024) Sun, M., Liu, Z., Bair, A., & Kolter, J. Z. (2024, May). *A Simple and Effective Pruning Approach for Large Language Models* (No. arXiv:2306.11695). arXiv. doi: 10.48550/arXiv.2306.11695
- Sundar et al. (2008) Sundar, S. S. (2008). The MAIN Model: A Heuristic Approach to Understanding Technology Effects on Credibility. *Digital Media, Youth, and Credibility*, 73–100. doi: doi:10.1162/dmal.9780262562324.073
- Tankelevitch et al. (2025) Tankelevitch, L., Glassman, E. L., He, J., Kittur, A., Lee, M., Palani, S., … Subramonyam, H. (2025, August). *Understanding, Protecting, and Augmenting Human Cognition with Generative AI: A Synthesis of the CHI 2025 Tools for Thought Workshop* (No. arXiv:2508.21036). arXiv. doi: 10.48550/arXiv.2508.21036
- team et al. (2024) team, L. C. M., Barrault, L., Duquenne, P.-A., Elbayad, M., Kozhevnikov, A., Alastruey, B., … Schwenk, H. (2024, December). *Large Concept Models: Language Modeling in a Sentence Representation Space* (No. arXiv:2412.08821). arXiv. doi: 10.48550/arXiv.2412.08821
- Tholander et al. (2023) Tholander, J., & Jonsson, M. (2023, July). Design Ideation with AI - Sketching, Thinking and Talking with Generative Machine Learning Models. In *Proceedings of the 2023 ACM Designing Interactive Systems Conference* (pp. 1930–1940). New York, NY, USA: Association for Computing Machinery. doi: 10.1145/3563657.3596014
- Vasconcelos et al. (2016) Vasconcelos, L. A., & Crilly, N. (2016, January). Inspiration and fixation: Questions, methods, findings, and challenges. *Design Studies*, 42, 1–32. doi: 10.1016/j.destud.2015.11.001
- Vasconcelos et al. (2018) Vasconcelos, L. A., Neroni, M. A., Cardoso, C., & Crilly, N. (2018, April). Idea representation and elaboration in design inspiration and fixation experiments. *International Journal of Design Creativity and Innovation*, 6(1-2), 93–113. doi: 10.1080/21650349.2017.1362360
- Verbeek (2015) Verbeek, P.-P. (2015, April). COVER STORYBeyond interaction: A short introduction to mediation theory. *Interactions*, 22(3), 26–31. doi: 10.1145/2751314
- Viswanathan et al. (2012) Viswanathan, V., & Linsey, J. (2012, June). Design Fixation in Physical Modeling: An Investigation on the Role of Sunk Cost. In *ASME 2011 International Design Engineering Technical Conferences and Computers and Information in Engineering Conference* (pp. 119–130). American Society of Mechanical Engineers Digital Collection. doi: 10.1115/DETC2011-47862
- Viswanathan et al. (2013) Viswanathan, V., & Linsey, J. (2013, April). Examining design fixation in engineering idea generation: The role of example modality. *International Journal of Design Creativity and Innovation*, 1(2), 109–129. doi: 10.1080/21650349.2013.774689
- Wang et al. (2022) Wang, C., Yang, Y., Gao, C., Peng, Y., Zhang, H., & Lyu, M. R. (2022, November). No More Fine-Tuning? An Experimental Evaluation of Prompt Tuning in Code Intelligence. In *Proceedings of the 30th ACM Joint European Software Engineering Conference and Symposium on the Foundations of Software Engineering* (pp. 382–394). doi: 10.1145/3540250.3549113
- Xiao et al. (2024) Xiao, Y., Ng, L. H. X., Liu, J., & Diab, M. T. (2025). *Humanizing Machines: Rethinking LLM Anthropomorphism Through a Multi-Level Framework of Design*. arXiv. doi: 10.48550/ARXIV.2508.17573
- Xie et al. (2025) Xie, Y., Liu, P., & Zhang, Z. (2025, May). *Erasing Concepts, Steering Generations: A Comprehensive Survey of Concept Suppression* (No. arXiv:2505.19398). arXiv. doi: 10.48550/arXiv.2505.19398
- Yoo et al. (2024) Yoo, D., & Joo, J. (2024, July). BI-CST: Behavioral Science-based Creativity Support Tool for Overcoming Design Fixation. In *Companion Publication of the 2024 ACM Designing Interactive

---

## Page 47

Systems Conference (pp. 116–120). New York, NY, USA: Association for Computing Machinery. doi: 10.1145/3656156.3663704
- [9] Youmans, R. J. (2011). Design Fixation in the Wild: Design Environments and Their Influence on Fixation. The Journal of Creative Behavior, 45(2), 101–107. doi: 10.1002/j.2162-6057.2011.tb01089.x
- [10] Youmans, R. J., & Arciszewski, T. (2014a). Design Fixation: A Cloak of Many Colors. In J. S. Gero (Ed.), Design Computing and Cognition ’12 (pp. 115–129). Dordrecht: Springer Netherlands. doi: 10.1007/978-94-017-9112-0_7
- [11] Youmans, R. J., & Arciszewski, T. (2014b, May). Design fixation: Classifications and modern methods of prevention. AI EDAM, 28(2), 129–137. doi: 10.1017/S0890060414000043
- [12] Zhang, D., Finckenberg-Broman, P., Hoang, T., Pan, S., Xing, Z., Staples, M., & Xu, X. (2024, June). Right to be Forgotten in the Era of Large Language Models: Implications, Challenges, and Solutions (No. arXiv:2307.03941). arXiv. doi: 10.48550/arXiv.2307.03941
- [13] Zhang, Y., Schwarzschild, A., Carlini, N., Kolter, J. Z., & Ippolito, D. (2024, August). Forcing Diffuse Distributions out of Language Models. In First Conference on Language Modeling.
- [14] Zheng, C., Do, E. Y.-L., & Budd, J. (2017, June). Joinery: Parametric Joint Generation for Laser Cut Assemblies. In Proceedings of the 2017 ACM SIGCHI Conference on Creativity and Cognition (pp. 63–74). Singapore Singapore: ACM. doi: 10.1145/3059454.3059459
- [15] Zou, A., Phan, L., Chen, S., Campbell, J., Guo, P., Ren, R., … Hendrycks, D. (2025, March). Representation Engineering: A Top-Down Approach to AI Transparency (No. arXiv:2310.01405). arXiv. doi: 10.48550/arXiv.2310.01405