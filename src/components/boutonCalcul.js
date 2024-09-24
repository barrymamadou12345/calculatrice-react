import React from "react";

class BoutonCalcul extends React.Component {
  render() {
    return (
      <button
        className={`w-16 h-16 rounded-full bg-gray-800 text-white text-xl font-bold focus:outline-none active:bg-gray-700 ${this.props.className}`}
        onClick={this.props.onClick}
      >
        {this.props.label}
      </button>
    );
  }
}

export default BoutonCalcul;
