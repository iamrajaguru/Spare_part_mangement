import { Component } from "react";
import "./App.css";
import spareList from "./spareList.json";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }
  getInitialState = () => ({
    locationValid: false,
    branchLocation: "",
    isSubmitted: false,
    selectedYear: "",
    selectedModel: "",
    modelId: "",
  });

  getFilteredListOption = (spareList) =>
    spareList
      .filter((i) => i.year === Number(this.state.selectedYear))[0]
      .car.map((z, key) => (
        <option key={key} value={z.model_name}>
          {z.model_name}
        </option>
      ));

  findModel = (spareList) => {
    let fliteredObject = spareList
      .filter((i) => i.year === Number(this.state.selectedYear))[0]
      .car.filter((z) => z.model_name === this.state.selectedModel)[0];
    return fliteredObject ? (
      <div className="model_container">
        <i className="fas fa-tools pr-2 pb-2" />
        Model Found {fliteredObject.model_id}
      </div>
    ) : (
      <div>Not Found</div>
    );
  };
  render() {
    const { branchLocation, locationValid, isSubmitted } = this.state;
    return (
      <div className="d-flex align-items-center justify-content-center root">
        <div className="head_text"> ABC REPAIR SHOP</div>
        <div className="bg_car"></div>
        <form>
          <div className="row">
            <div className="col-sm-12 col-md-6 d-flex align-items-center justify-content-center p-2">
              <input
                type="text"
                className="form-control w-100"
                placeholder="Branch Location"
                value={this.state.branchLocation}
                onChange={(e) =>
                  this.setState({ branchLocation: e.target.value })
                }
              />
            </div>
            <div className="col-sm-12 col-md-6 d-flex align-items-center justify-content-center p-2">
              <button
                type="submit"
                className=" btn-custom w-100"
                onClick={(e) => {
                  e.preventDefault();
                  branchLocation.toLocaleLowerCase() === "mumbai"
                    ? this.setState({
                        locationValid: true,
                        isSubmitted: true,
                      })
                    : this.setState({
                        isSubmitted: true,
                        locationValid: false,
                      });
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </form>

        {locationValid ? (
          <div className="row mt-5">
            <div className="col-6  d-flex align-items-center justify-content-center ">
              <select
                className="form-control w-auto"
                onChange={(e) =>
                  this.setState({ selectedYear: e.target.value })
                }
                value={this.state.selectedYear}
              >
                {" "}
                <option className="text-muted" value="">
                  {" "}
                  Select Year
                </option>
                {spareList.map((i, key) => (
                  <option key={key} value={i.year}>
                    {i.year}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-6  d-flex align-items-center justify-content-center ">
              {this.state.selectedYear && (
                <select
                  className="form-control w-auto"
                  onChange={(e) => {
                    this.setState({
                      selectedModel: e.target.value,
                    });
                  }}
                  value={this.state.selectedModel}
                >
                  <option className="text-muted" value="">
                    Select Model
                  </option>

                  {this.getFilteredListOption(spareList)}
                </select>
              )}
            </div>
            <div className="col-12 d-flex align-items-center justify-content-center mt-5">
              {" "}
              {this.state.selectedModel && this.findModel(spareList)}
            </div>
          </div>
        ) : (
          isSubmitted && (
            <div className="d-flex align-items-center justify-content-center card custom-card">
              <i
                className="fas fa-map-marker-alt text-primary mr-2 mb-2"
                id="loc_icon"
              />
              <div>Location not Valid</div>
              <button
                className="btn btn-danger btn-clear"
                onClick={() => this.setState(this.getInitialState())}
              >
                <i className="fas fa-times " />
              </button>
            </div>
          )
        )}
      </div>
    );
  }
}

export default App;
