function setVisibility(element, visible, visibleDisplay = 'block') {
	element.style.display = visible ? visibleDisplay : 'none';
};

module.exports = setVisibility;