const PageHeader = ({ title, description }) => (
  <div className="pageHeader">
    <p className="pageDescription">{description}</p>
    <h1 className="pageTitle">{title}</h1>
  </div>
);

export default PageHeader;
