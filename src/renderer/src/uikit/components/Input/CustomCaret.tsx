import { useEffect, useState } from "react";

import { motion } from "motion/react";

interface CustomCaretProps {
  inputRef: React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
}

export function CustomCaret({ inputRef }: CustomCaretProps) {
  const [caretPosition, setCaretPosition] = useState({ height: 20, x: 0 });
  const [isReady, setIsReady] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isWindowFocused, setIsWindowFocused] = useState(true);
  const [isInteracting, setIsInteracting] = useState(false);
  const [interactionTimeout, setInteractionTimeout] =
    useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!inputRef.current) return;

    const updateCaretPosition = () => {
      const input = inputRef.current;
      if (!input) return;

      const { selectionEnd, selectionStart } = input;
      if (selectionStart !== selectionEnd) return; // Don't show caret during selection

      // Create a temporary span to measure text width
      const span = document.createElement("span");
      span.style.font = window.getComputedStyle(input).font;
      span.style.whiteSpace = "pre"; // Preserve whitespace
      const text = input.value.substring(0, selectionStart ?? 0);
      span.textContent = text;

      // Measure the text width
      document.body.appendChild(span);
      let position = span.offsetWidth;

      // If the text ends with a space, measure the width of a single space
      if (text.endsWith(" ")) {
        span.textContent = " "; // Just a single space
        const spaceWidth = span.offsetWidth;
        position = position - spaceWidth + span.offsetWidth; // Subtract the regular space width and add the non-breaking space width
      }

      document.body.removeChild(span);

      // Get input's font size for caret height
      const computedStyle = window.getComputedStyle(input);
      const fontSize = parseInt(computedStyle.fontSize);

      // Get input's width and padding
      const inputWidth = input.offsetWidth;
      const inputStyle = window.getComputedStyle(input);
      const paddingLeft = parseInt(inputStyle.paddingLeft);
      const paddingRight = parseInt(inputStyle.paddingRight);
      const availableWidth = inputWidth - paddingLeft - paddingRight;

      // Constrain the caret position to the input's width
      const constrainedPosition = Math.min(position, availableWidth);

      setCaretPosition({
        height: fontSize * 1.2, // Slightly taller than font
        x: constrainedPosition + paddingLeft, // Add paddingLeft to position the caret correctly
      });
      setIsReady(true);
    };

    const input = inputRef.current;

    // Calculate initial position immediately
    updateCaretPosition();

    const handleInteraction = () => {
      setIsInteracting(true);
      if (interactionTimeout) {
        clearTimeout(interactionTimeout);
        setInteractionTimeout(null);
      }
      const timeout = setTimeout(() => {
        setIsInteracting(false);
      }, 500);
      setInteractionTimeout(timeout);
    };

    const handleMouseDown = () => {
      setIsMouseDown(true);
      handleInteraction();
      // Use requestAnimationFrame to ensure we get the updated selection position
      requestAnimationFrame(updateCaretPosition);
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
      updateCaretPosition();
    };

    const handleMouseMove = () => {
      if (isMouseDown) {
        requestAnimationFrame(updateCaretPosition);
      }
    };

    const handleKeyDown = (e: Event) => {
      const keyEvent = e as KeyboardEvent;
      if (keyEvent.key === "ArrowLeft" || keyEvent.key === "ArrowRight") {
        handleInteraction();
      }
    };

    const handleInput = () => {
      handleInteraction();
      updateCaretPosition();
    };

    const handleFocus = () => {
      setIsFocused(true);
      handleInteraction();
      // Update position when focus is regained
      requestAnimationFrame(updateCaretPosition);
    };

    const handleClick = () => {
      handleInteraction();
      updateCaretPosition();
    };

    const handleWindowFocus = () => {
      setIsWindowFocused(true);
      if (isFocused) {
        // Reset animation state when window regains focus
        setIsReady(false);
        requestAnimationFrame(() => {
          setIsReady(true);
          updateCaretPosition();
        });
      }
    };

    const handleWindowBlur = () => {
      setIsWindowFocused(false);
    };

    // Then set up event listeners for subsequent updates
    input.addEventListener("input", handleInput);
    input.addEventListener("keyup", updateCaretPosition);
    input.addEventListener("keydown", handleKeyDown);
    input.addEventListener("focus", handleFocus);
    input.addEventListener("click", handleClick);
    input.addEventListener("blur", () => setIsFocused(false));
    input.addEventListener("mousedown", handleMouseDown);
    input.addEventListener("mouseup", handleMouseUp);
    input.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("focus", handleWindowFocus);
    window.addEventListener("blur", handleWindowBlur);

    // Also handle mouseup outside the input
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      input.removeEventListener("input", handleInput);
      input.removeEventListener("keyup", updateCaretPosition);
      input.removeEventListener("keydown", handleKeyDown);
      input.removeEventListener("focus", handleFocus);
      input.removeEventListener("click", handleClick);
      input.removeEventListener("blur", () => setIsFocused(false));
      input.removeEventListener("mousedown", handleMouseDown);
      input.removeEventListener("mouseup", handleMouseUp);
      input.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("focus", handleWindowFocus);
      window.removeEventListener("blur", handleWindowBlur);
      document.removeEventListener("mouseup", handleMouseUp);
      if (interactionTimeout) {
        clearTimeout(interactionTimeout);
      }
    };
  }, [inputRef, isMouseDown, isFocused, interactionTimeout]);

  // Show caret if either focused or mouse is down
  if (!isFocused && !isMouseDown) return null;

  return (
    <motion.div
      animate={{
        opacity:
          isMouseDown || isInteracting
            ? 1
            : isReady && isWindowFocused
              ? [0, 1, 1]
              : 0,
      }}
      className="bg-primary-500 absolute pointer-events-none w-[2px] rounded-full"
      initial={{ opacity: isMouseDown || isInteracting ? 1 : 0 }}
      style={{
        height: caretPosition.height,
        left: caretPosition.x,
        top: "50%",
        translateY: "-50%",
      }}
      transition={{
        duration: 0.5,
        ease: "linear",
        repeat: isMouseDown || isInteracting ? 0 : Infinity,
        repeatType: "reverse",
      }}
    />
  );
}
