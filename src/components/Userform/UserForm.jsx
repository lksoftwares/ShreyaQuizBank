import "../Userform/UserForm.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function UserForm() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [formData, setFormData] = useState([]);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("ID");

  useEffect(() => {
    if (userId) {
      fetchQuestionsByUserId(userId);
    }
  }, [userId]);

  const fetchQuestionsByUserId = async (user_id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://192.168.1.54:7241/QuizTransaction/GetAllQuizQuestion?User_ID=${user_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setQuestions(data);
      // Initialize formData with the questions
      setFormData(
        data.map((question) => ({
          Ques_ID: question.ques_ID,
          User_ID: userId,
          Answer: "",
        }))
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => {
      const updatedData = [...prevData];
      updatedData[currentQuestionIndex].Answer = value;
      return updatedData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // POST request to the submit answer endpoint
      const response = await axios.post(
        "http://192.168.1.54:7241/Quiz_AnsTransaction/SubmitAnswer",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.setItem("token", response.data.token);
      console.log(response.data);
      toast.success("All answers submitted successfully");
    } catch (err) {
      toast.error("Failed to submit answers: " + err.message);
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) =>
      Math.min(prevIndex + 1, questions.length - 1)
    );
  };

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  if (loading) {
    return <div className="load">Loading Please Wait...</div>;
  }

  if (error) {
    return <div className="load">Error: {error}</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="App bg">
      <ToastContainer />

      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset">
          <h1 className="h1">Knowledge Test Quiz</h1>
          {questions.length === 0 ? (
            <p>No questions available</p>
          ) : (
            <div>
              <h3>Question Description:</h3>
              <input
                type="text"
                placeholder="Enter Question here"
                readOnly
                value={currentQuestion.ques_Desc}
              />
              <h3>Answer Options</h3>
              <div>
                <input type="text" className="short" placeholder="A" readOnly />
                <input
                  type="text"
                  className="option"
                  placeholder="Option A"
                  readOnly
                  value={currentQuestion.opt_A}
                />
                <span>
                  <input
                    type="text"
                    className="short short-box"
                    placeholder="B"
                    readOnly
                  />
                  <input
                    type="text"
                    className="option"
                    placeholder="Option B"
                    readOnly
                    value={currentQuestion.opt_B}
                  />
                </span>
                <input type="text" className="short" placeholder="C" readOnly />
                <input
                  type="text"
                  className="option"
                  placeholder="Option C"
                  readOnly
                  value={currentQuestion.opt_C}
                />
                <span>
                  <input
                    type="text"
                    className="short short-box"
                    placeholder="D"
                    readOnly
                  />
                  <input
                    type="text"
                    className="option"
                    placeholder="Option D"
                    readOnly
                    value={currentQuestion.opt_D}
                  />
                </span>
                <br />
                <br />
                <label htmlFor="">Your Answer: </label>
                <br />
                <br />
                <input
                  type="text"
                  className="long"
                  placeholder="Enter Your Answer"
                  value={formData[currentQuestionIndex]?.Answer || ""}
                  onChange={handleChange}
                />
                <br />
                <span>
                  <button
                    type="button"
                    className="button-cont"
                    onClick={handleNextQuestion}
                    disabled={currentQuestionIndex === questions.length - 1}
                  >
                    Next
                  </button>
                  <button
                    type="button"
                    className="button-cont"
                    onClick={handlePrevQuestion}
                    disabled={currentQuestionIndex === 0}
                  >
                    Previous
                  </button>
                </span>
                {currentQuestionIndex === questions.length - 1 && (
                  <button type="submit" className="submit">
                    Submit All Answers
                  </button>
                )}
              </div>
            </div>
          )}
        </fieldset>
      </form>
    </div>
  );
}

export default UserForm;
