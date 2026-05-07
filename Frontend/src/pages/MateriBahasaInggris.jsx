import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useApp } from '../App';
import "./MateriDetail.css"; // pakai CSS yang sama biar konsisten

const EnglishMateriDetail = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="materi-container">

      {/* HEADER */}
      <div className="materi-header-card">
        <h2 className="materi-title">
          {state?.title || "English Material"}
        </h2>
        <p className="materi-meta">Topic: {state?.topic || "English"}</p>
        <p className="materi-meta">ID: {id}</p>
      </div>

      <hr />

      {/* ELEMENTARY */}
      <h1 className="section-main">
        ELEMENTARY SCHOOL (Grade 1–6)
      </h1>

      <p className="section-desc">
        At the elementary level, English lessons focus on basic vocabulary and simple sentence structures.
      </p>

      <h3 className="sub-title">1. Vocabulary (Basic Words)</h3>
      <p className="content-text">
        Students learn daily vocabulary such as family members, colors, animals, classroom objects, and numbers.
      </p>

      <h3 className="sub-title">2. Greetings & Introductions</h3>
      <p className="content-text">
        Greetings like "Hello", "Good morning", and simple self-introduction like "My name is..."
      </p>

      <h3 className="sub-title">3. Simple Sentences</h3>
      <p className="content-text">
        Example: "This is a cat", "I like apples", "I don't like milk".
      </p>

      <h3 className="sub-title">4. Imperative Sentences</h3>
      <p className="content-text">
        Commands such as "Stand up", "Sit down", "Be quiet".
      </p>

      <h3 className="sub-title">5. Describing Things</h3>
      <p className="content-text">
        Using adjectives like big/small, happy/sad to describe objects.
      </p>

      <hr />

      {/* JUNIOR HIGH */}
      <h1 className="section-main">
        JUNIOR HIGH SCHOOL (Grade 7–9)
      </h1>

      <p className="section-desc">
        Students learn structured texts, grammar, and storytelling.
      </p>

      <h3 className="sub-title">1. Descriptive Text</h3>
      <p className="content-text">
        Describes people, places, or objects in detail.
      </p>

      <h3 className="sub-title">2. Procedure Text</h3>
      <p className="content-text">
        Explains how to do something step-by-step.
      </p>

      <h3 className="sub-title">3. Narrative Text</h3>
      <p className="content-text">
        Stories like fairy tales, legends, and fables.
      </p>

      <h3 className="sub-title">4. Recount Text</h3>
      <p className="content-text">
        Past experiences such as holidays or events.
      </p>

      <h3 className="sub-title">5. Functional Text</h3>
      <p className="content-text">
        Announcements, invitations, greeting cards, short messages.
      </p>

      <h3 className="sub-title">6. Grammar</h3>
      <p className="content-text">
        Present, Past, Future tenses, modal verbs, comparatives.
      </p>

      <hr />

      {/* SENIOR HIGH */}
      <h1 className="section-main">
        SENIOR HIGH SCHOOL (Grade 10–12)
      </h1>

      <p className="section-desc">
        Focus on analysis, argumentation, and formal writing.
      </p>

      <h3 className="sub-title">1. Explanation Text</h3>
      <p className="content-text">
        Explains natural or social phenomena.
      </p>

      <h3 className="sub-title">2. Analytical Exposition</h3>
      <p className="content-text">
        Presents opinions supported by arguments.
      </p>

      <h3 className="sub-title">3. Hortatory Exposition</h3>
      <p className="content-text">
        Gives recommendation or suggestion.
      </p>

      <h3 className="sub-title">4. Report Text</h3>
      <p className="content-text">
        Provides factual information about things.
      </p>

      <h3 className="sub-title">5. Discussion Text</h3>
      <p className="content-text">
        Presents pros and cons of an issue.
      </p>

      <h3 className="sub-title">6. Application Letter & CV</h3>
      <p className="content-text">
        Formal job application and curriculum vitae writing.
      </p>

      <h3 className="sub-title">7. Grammar</h3>
      <p className="content-text">
        Passive voice, conditional sentences, direct & indirect speech.
      </p>

      {/* NAVIGATION BOTTOM */}
      <div className="materi-nav-bottom">
        <button className="btn-nav btn-back" onClick={() => navigate('/dashboard')}>
          <span className="btn-nav-icon">←</span> Kembali
        </button>
        <button className="btn-nav btn-next" onClick={() => navigate('/dashboard')}>
          Lanjutkan <span className="btn-nav-icon">→</span>
        </button>
      </div>

    </div>
  );
};

export default EnglishMateriDetail;