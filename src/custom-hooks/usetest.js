import React, { useState, useEffect } from "react";

const answerBuilder = (quizId, userOptionId, correctOptionId) => ({
  quizId,
  userOptionId,
  correctOptionId,
  attempts: 0,
  showExplanation: false,
  alert: false,
});

export default function useTest(previousData, quizId, includeApiFunction) {
  const [answers, setAnswers] = useState([]);
  const [answer, setAnswer] = useState();
  const [answersToUpdate, setanswersToUpdate] = useState([]);
  const [answersToAdd, setanswersToAdd] = useState([]);
  const [componentLoaded, setcomponentLoaded] = useState(false);

  useEffect(() => {
    // console.log({quizId})
    setThisAnswer(quizId);
  }, [quizId]);

  useEffect(() => {
    // console.log(previousData)
    const prepareUserData =
      previousData &&
      previousData.reduce((aggregate, current) => {
        const state = current.userOption === current.correctOption;
        const build = answerBuilder(
          current.quizId,
          current.userOption,
          current.correctOption,
          state
        );
        aggregate = aggregate.concat(build);
        return aggregate;
      }, []);
    setcomponentLoaded(true);
    setAnswers(prepareUserData);
  }, [componentLoaded]);

  const upsertAnswer = (currentAnswer) => {
    let updatedAnswers = null;
    if (answers.some((ans) => ans.quizId === currentAnswer.quizId)) {
      updatedAnswers = answers.map((ans) =>
        ans.quizId === currentAnswer.quizId ? currentAnswer : ans
      );
    } else {
      updatedAnswers = answers.concat(currentAnswer);
    }
    return updatedAnswers;
  };

  const updateAnswers = () => {
    const currentAnswer = { ...answer, attempts: 2 };
    if (includeApiFunction) {
      if (previousData.some((ans) => ans.quizId === currentAnswer.quizId)) {
        setanswersToUpdate(
          answersToUpdate.map((ans) =>
            ans.quizId === currentAnswer.quizId ? currentAnswer : ans
          )
        );
      } else {
        setanswersToAdd(answersToAdd.concat(currentAnswer));
      }
    }
    setAnswers(upsertAnswer(currentAnswer));
  };

  const userAnswersToAdd = answersToAdd.filter(
    (answer) => answer.userOptionId !== 0
  );
  const userAnswersToUpdate = answersToUpdate.filter(
    (answer) => answer.userOptionId !== 0
  );

  const userScore = answers.reduce((aggregate, current) => {
    // console.log({ current, aggregate });
    if (
      current.userOptionId === 0 ||
      current.userOptionId !== current.correctOptionId
    )
      return aggregate;
    return aggregate + 1;
  }, 0);

  const setThisAnswer = (quizId) => {
    let thisanswer = answers.find((answer) => answer.quizId === quizId);
    if (thisanswer) {
      setAnswer(thisanswer);
      return;
    }
    thisanswer = answerBuilder(quizId, 0, 0);
    // console.log({thisanswer})
    setAnswer(thisanswer);
  };

  const updateThisAnswer = (options) => {
    const thisanswer = { ...answer, ...options };
    setAnswer(thisanswer);
  };

  const answerIsCorrect =
    answer &&
    answer.userOptionId === answer.correctOptionId &&
    answer.userOptionId !== 0;
  const optionIsCorrect = (optionId) => answer.correctOptionId === optionId;
  const lockState = answer && (answer.attempts === 2 || answer.showExplanation);

  const showExplanation = () => {
    const update = { ...answer, showExplanation: true, attempts: 2 };
    setAnswer(update);
  };

  const correctClassName = (optionId) => {
    return (
      (answer.attempts === 1 &&
        answer.userOptionId === optionId &&
        answerIsCorrect) ||
      (answer.showExplanation && answer.correctOptionId === optionId) ||
      (answer.attempts === 2 && answer.correctOptionId === optionId)
    );
  };

  const wrongClassName = (optionId) => {
    return (
      answer.attempts >= 1 &&
      answer.userOptionId === optionId &&
      !answerIsCorrect
    );
  };

  const lockAllAnswers = () => {
    const newAnswers = answers.map((answer) => ({ ...answer, attempts: 2 }));
    setAnswers(newAnswers);
  };

  const lockThisAnswer = () => {
    const thisanswer = { ...answer, attempts: 2 };
    setAnswer(thisanswer);
  };

  const canTryAgain = answer && !answer.showExplanation && !answerIsCorrect;

  const willTryAgain = answer && answer.attempts === 1 && canTryAgain;

  const willSubmit = answer && answer.attempts === 0;

  const willMoveNext =
    answer &&
    (answer.attempts === 2 || answer.showExplanation || answerIsCorrect);

  const willShowAlert = answer && answer.attempts <= 2;

  const userAnswersCount = answer && answers.length;

  return {
    updateAnswers,
    userScore,
    updateThisAnswer,
    userAnswersToAdd,
    userAnswersToUpdate,
    answer,
    setThisAnswer,
    optionIsCorrect,
    correctClassName,
    wrongClassName,
    answers,
    userAnswers: answers,
    willTryAgain,
    willSubmit,
    willMoveNext,
    willShowAlert,
    setAnswers,
    answerIsCorrect,
    lockState,
    userAnswersCount,
    showExplanation,
    lockAllAnswers,
    lockThisAnswer,
  };
}
