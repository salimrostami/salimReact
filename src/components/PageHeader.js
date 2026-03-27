const PageHeader = ({ title, description }) => (
  <div className="pageHeader">
    <p className="pageDescription">{description}</p>
    <h3 className="pageTitle">{title}</h3>
  </div>
);

export default PageHeader;
