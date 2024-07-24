import React, { Component } from "react";
import { useParams } from "react-router-dom";

// Function to get route parameters in a class component
function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let params = useParams();
    return <Component {...props} params={params} />;
  }
  return ComponentWithRouterProp;
}

class Category extends Component {
  render() {
    const { categoryName } = this.props.params; // Get the category from route parameters
    return (
      <div>
        <h1>Category: {categoryName || "All"}</h1>
        {/* Display items based on category */}
      </div>
    );
  }
}

export default withRouter(Category); // Enhance component to access route params
