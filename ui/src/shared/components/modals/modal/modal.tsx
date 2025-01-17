import React, { FunctionComponent, ReactNode, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { DispatchThunk, RootState } from "../../../../store/root-state";
import CloseButtonIcon from "../../../img/modals/close-button.png";
import ModalConfig from "../../../../api/models/shared/modal/modal-config";
import LoginModal from "../login/login.modal";
import LoginCredentialModal from "../login-credential/login-credential.modal";
import RegistrationModal from "../registration/registration.modal";
import VerifyInformationModal from "../verify-information/verify-information.modal";
import ReportCredentialModal from "../report-credential/report-credential.modal";
import DemoInfoModal from "../demo-info/demo-info.modal";
import AddGHGModal from "../add-ghg-cred/add-ghg-cred";
import SendGHGProof from "../send-ghg-proof/send-ghg-proof";
import AcceptGHGProof from "../accept-ghg-proof/accept-ghg-proof";
import BWInvitation from "../bw-invitation/bw-invitation.modal";
import EmissionFilters from "../../../../components/account/subpages/account-emission-filters/emission-filters";
import "./modal.scss";
import AddPledgeModal from "../add-pledge/add-pledge.modal";
import AddSiteCredentialModal from "../add-site-credential/add-site-credential.modal";
import AddTransferModal from "../add-transfer/add-transfer.modal";

import InformationModal from "../information/information.modal";
import InformationSummaryModal from "../information-summary/information-summary.modal";

import * as appActions from "../../../../store/app/app.actions";
import * as userActions from "../../../../store/user/user.actions";
import * as userSelectors from "../../../../store/user/user.selectors";
import * as accountActions from "../../../../store/account/account.actions";
import * as walletActions from "../../../../store/account/account.actions";
import * as accountSelectors from "../../../../store/account/account.selectors";
import AddClimateActionModal from "../add-climate-action/add-climate-action.modal";
import { IUser } from "../../../../api/models/User/IUser";
import ISite from "../../../../api/models/DTO/Site/ISite";
import IWallet from "../../../../api/models/DTO/Wallet/IWallet";
import IAggregatedEmission from "../../../../api/models/DTO/AggregatedEmission/IAggregatedEmission";
import IClimateAction from "../../../../api/models/DTO/ClimateAction/IClimateActions/IClimateAction";

interface IStateProps {
  user: IUser | null;
  modalConfig: ModalConfig;
  sites: Array<ISite>;
  climateActions: Array<IClimateAction>;
  loginError: string;
  scope1: any;
  wallet: any;
  wallets: Array<IWallet>;
}

interface IDispatchProps {
  showModal: (entityType: string) => void;
  hideModal: () => void;
  setScope1: (scope1: any) => void;
  addPledge: (pledge: any) => void;
  addTransfer: (transfer: any) => void;
  addSite: (site: ISite) => void;
  addClimateAction: (action: IClimateAction) => void;
  addAggregatedEmission: (aggregatedEmission: IAggregatedEmission) => void;
  handlePasswordLogin: (
    email: string,
    password: string,
    setNotification: any
  ) => void;
}

interface IProps extends IStateProps, IDispatchProps {}

const Modal: FunctionComponent<IProps> = (props) => {
  const modalRef = useRef(null);

  const {
    user,
    modalConfig,
    sites,
    climateActions,
    loginError,
    showModal,
    hideModal,
    addPledge,
    addTransfer,
    addSite,
    addClimateAction,
    addAggregatedEmission,
    handlePasswordLogin,
    scope1,
    setScope1,
    wallet,
    wallets,
  } = props;

  if (modalConfig.entityType === "") return null;

  let component = null;
  let title = "";

  switch (modalConfig.entityType) {
    case "login":
      title = "Login";
      component = (
        <LoginModal
          hideModal={hideModal}
          handlePasswordLogin={handlePasswordLogin}
          onModalShow={showModal}
          loginError={loginError}
        />
      );
      break;
    case "login-credential":
      title = "Login with your digital wallet";
      component = (
        <LoginCredentialModal
          QRCodeURL={props.QRCodeURL}
          sendRequest={props.sendRequest}
          onModalShow={showModal}
        />
      );
      break;
    case "registration":
      title = "Sign up";
      component = <RegistrationModal onModalShow={showModal} />;
      break;
    case "verify-information":
      title = "Sign up";
      component = (
        <VerifyInformationModal
          onModalShow={showModal}
          onModalHide={hideModal}
        />
      );
      break;
    case "report-credential":
      title = "Report issue with credential information";
      component = <ReportCredentialModal />;
      break;
    case "demo-info":
      title = "Demo Account";
      component = <DemoInfoModal onModalHide={hideModal} />;
      break;
    case "add-ghg-cred":
      title = "Add Scope 1 GHG emissions";
      component = (
        <AddGHGModal onModalHide={hideModal} onModalShow={showModal} />
      );
      break;
    case "send-ghg-proof":
      title = "Send proof notification for a Scope 1 GHG emissions credential";
      component = (
        <SendGHGProof
          onModalHide={hideModal}
          onModalShow={showModal}
          QRCodeURL={props.QRCodeURL}
          sendRequest={props.sendRequest}
          scope1={props.scope1}
          user={user}
          wallet={wallet}
          wallets={wallets}
        />
      );
      break;
    case "bw-invitation":
      title = "Link to connect Business Wallet";
      component = (
        <BWInvitation
          onModalHide={hideModal}
          onModalShow={showModal}
          QRCodeURL={props.QRCodeURL}
          sendRequest={props.sendRequest}
          scope1={props.scope1}
          user={user}
        />
      );
      break;
    case "accept-ghg-proof":
      title = "Review imported data";
      component = (
        <AcceptGHGProof
          onModalHide={hideModal}
          onModalShow={showModal}
          scope1={props.scope1}
          sites={sites}
          user={user}
          setScope1={setScope1}
        />
      );
      break;
    case "emission-filters":
      title = "";
      component = (
        <EmissionFilters
          scope={modalConfig.parameters["Scope"]}
          type={modalConfig.parameters["Type"]}
          climateActions={climateActions}
        />
      );
      break;
    case "add-pledge":
      title = "Add new pledge";
      component = (
        <AddPledgeModal
          onModalHide={hideModal}
          addPledge={addPledge}
          user={user}
        />
      );
      break;
    case "add-site-credential":
      title = "Add site credential";
      component = (
        <AddSiteCredentialModal
          user={user}
          addSite={addSite}
          onModalHide={hideModal}
          submitButtonText="Submit Site Credential"
        />
      );
      break;
    case "add-transfer":
      title = "Add transfer";
      component = (
        <AddTransferModal
          onModalHide={hideModal}
          addTransfer={addTransfer}
          sites={sites}
          user={user}
        />
      );
      break;
    case "add-climate-action":
      title = "Add climate action";
      component = (
        <AddClimateActionModal
          user={user}
          climateActions={climateActions}
          addClimateAction={addClimateAction}
          addAggregatedEmission={addAggregatedEmission}
          onModalHide={hideModal}
          sites={sites}
          defaultScope={modalConfig.parameters["Scope"]}
          defaultType={modalConfig.parameters["Type"]}
          submitButtonText="Submit Climate Action"
        />
      );
      break;
    case "information-agreements":
      component = <InformationModal title="Climate treaties & Agreements" />;
      break;
    case "information-pledges":
      component = <InformationModal title="Your pledges" />;
      break;
    case "information-emission":
      component = <InformationModal title="Total emissions" />;
      break;
    case "information-transfers":
      component = <InformationModal title="Transfers" />;
      break;
    case "information-climate-units":
      component = (
        <InformationModal title="Certified & Retired Climate Units" />
      );
      break;
    case "information-summary":
      component = <InformationSummaryModal title="Making sense of Data" />;
      break;
  }

  return (
    <div className="modal" ref={modalRef} onClick={hideModal}>
      <div className="modal__wrapper" onClick={(e) => e.stopPropagation()}>
        <div className="modal__close">
          <button className="modal__close-btn" onClick={hideModal}>
            <img src={CloseButtonIcon} alt="Close" />
          </button>
        </div>
        {title ? (
          <div
            className={
              modalConfig.entityType === "login-credential"
                ? "modal__title modal__title-register modal__row_content-center"
                : "modal__title modal__row_content-center"
            }
          >
            {title}
          </div>
        ) : (
          ""
        )}
        <div className="modal__body">{component}</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState, ownProps: any) => {
  return {
    user: userSelectors.getCurrentUser(state),
    modalConfig: state.app.modalConfig,
    sites: accountSelectors.getSites(state),
    climateActions: accountSelectors.getClimateActions(state),
    loginError: userSelectors.getLoginError(state),
  };
};

const mapDispatchToProps = (dispatch: DispatchThunk) => {
  return {
    showModal: (modalEntityType: string) =>
      dispatch(appActions.showModal(modalEntityType)),
    hideModal: () => dispatch(appActions.hideModal()),
    addPledge: (pledge: any) => dispatch(accountActions.addPledge(pledge)),
    addTransfer: (transfer: any) =>
      dispatch(accountActions.addTransfer(transfer)),
    addSite: (site: ISite) => dispatch(accountActions.addSite(site)),
    addClimateAction: (climateAction: IClimateAction) =>
      dispatch(accountActions.addClimateAction(climateAction)),
    addAggregatedEmission: (aggregatedEmission: IAggregatedEmission) =>
      dispatch(accountActions.addAggregatedEmission(aggregatedEmission)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
