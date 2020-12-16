export const parentChecker = (parent, child) => {
  let node = child.parentNode;

  // keep iterating unless null
  while (node != null) {
    if (node == parent) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
};

// Expects two DOM elements
// Purpose to recursively see if the child param has the parent param as an actual parent.
