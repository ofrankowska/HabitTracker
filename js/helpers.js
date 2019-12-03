const toggleClasses = (element, ...classNames) => {
  // If the class exists, remove it, if not, then add it
  classNames.forEach(className => element.classList.toggle(className));
};
const closeAlerts = () => {
  document.querySelectorAll(".alert").forEach(alert => {
    if (alert.classList.contains("show")) {
      toggleClasses(alert, "hide", "show");
    }
  });
};
const getProgress = (complete, goal) => {
  return `${(complete / goal) * 100}%`;
};
