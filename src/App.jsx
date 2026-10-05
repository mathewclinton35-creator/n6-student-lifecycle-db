import { useMemo, useState } from 'react';

const tabs = ['Overview', 'Jobs', 'Dispatch', 'Customers', 'Invoices', 'Team'];

const summaryCards = [
  { label: 'Open jobs', value: '42', trend: '+18%', tone: 'positive' },
  { label: 'Technicians online', value: '16', trend: '+4', tone: 'neutral' },
  { label: 'Avg. response', value: '42 min', trend: '-9 min', tone: 'positive' },
  { label: 'Revenue this week', value: '$28.4k', trend: '+12%', tone: 'positive' },
];

const initialJobs = [
  { id: 'SR-1042', customer: 'Westview Plaza', service: 'HVAC tune-up', priority: 'High', status: 'On route', technician: 'Alicia P.', eta: '12:40 PM', amount: 1180, address: '355 Park Ave' },
  { id: 'SR-1047', customer: 'Maple Ridge Homes', service: 'Breaker panel repair', priority: 'Urgent', status: 'Awaiting parts', technician: 'Marcus L.', eta: '2:15 PM', amount: 1620, address: '81 Cedar Dr' },
  { id: 'SR-1050', customer: 'Harbor Suites', service: 'Water heater install', priority: 'Normal', status: 'Quote sent', technician: 'Derrick S.', eta: '4:00 PM', amount: 940, address: '907 Harbor St' },
  { id: 'SR-1054', customer: 'Greenfield Medical', service: 'Backup generator check', priority: 'High', status: 'In progress', technician: 'Priya G.', eta: '5:20 PM', amount: 2140, address: '44 Meridian Rd' },
];

const customers = [
  { name: 'Northside Dental', service: 'Emergency repair', value: '$1,260', status: 'Active' },
  { name: 'Oakwood Residences', service: 'Preventive maintenance', value: '$820', status: 'Due soon' },
  { name: 'Summit Retail Group', service: 'Multi-site inspection', value: '$2,480', status: 'Contracted' },
  { name: 'Lakeview Apartments', service: 'Plumbing service call', value: '$940', status: 'Active' },
];

const invoices = [
  { label: 'Due today', amount: '$4,260', tone: 'danger' },
  { label: 'Pending approval', amount: '$6,940', tone: 'warning' },
  { label: 'Collected this week', amount: '$18,720', tone: 'success' },
];

const technicians = [
  { name: 'Alicia P.', specialty: 'HVAC', status: 'Available', jobs: 3, rating: '4.9', route: 'Downtown' },
  { name: 'Marcus L.', specialty: 'Electrical', status: 'On-call', jobs: 2, rating: '4.8', route: 'Northside' },
  { name: 'Derrick S.', specialty: 'Plumbing', status: 'Assigned', jobs: 4, rating: '4.9', route: 'Harbor' },
  { name: 'Priya G.', specialty: 'Generator', status: 'Available', jobs: 1, rating: '4.7', route: 'Midtown' },
];

const dispatchSchedule = [
  { time: '08:00', title: 'Route prep', tech: 'Alicia', detail: '6 jobs assigned' },
  { time: '10:15', title: 'Emergency repair', tech: 'Marcus', detail: 'Northside Dental' },
  { time: '12:40', title: 'HVAC inspection', tech: 'Alicia', detail: 'Westview Plaza' },
  { time: '14:30', title: 'Water heater install', tech: 'Derrick', detail: 'Harbor Suites' },
];

const activityFeed = [
  'Quote approved for Harbor Suites',
  'Technician Alicia checked in 2 minutes ago',
  'Parts request submitted for Maple Ridge Homes',
  'Invoice sent to Summit Retail Group',
];

const priorityClass = {
  High: 'priority high',
  Urgent: 'priority urgent',
  Normal: 'priority normal',
};

const statusClass = {
  'On route': 'status route',
  'Awaiting parts': 'status waiting',
  'Quote sent': 'status quote',
  'In progress': 'status active',
};

function App() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [jobs, setJobs] = useState(initialJobs);
  const [selectedJobId, setSelectedJobId] = useState(initialJobs[0].id);
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredJobs = useMemo(() => {
    if (statusFilter === 'All') return jobs;
    return jobs.filter((job) => job.status === statusFilter);
  }, [jobs, statusFilter]);

  const selectedJob = jobs.find((job) => job.id === selectedJobId) ?? jobs[0];

  const handleQuickAssign = () => {
    setJobs((current) =>
      current.map((job) =>
        job.id === selectedJobId ? { ...job, status: 'On route', technician: 'Marcus L.' } : job,
      ),
    );
  };

  return (
    <div className="service-app">
      <aside className="sidebar panel">
        <div className="brand-block">
          <div className="brand-icon">F</div>
          <div>
            <p className="eyebrow">Field operations</p>
            <h1>FieldFlow</h1>
          </div>
        </div>

        <nav className="nav-stack" aria-label="Main navigation">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={tab === activeTab ? 'nav-btn active' : 'nav-btn'}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>

        <div className="sidebar-card">
          <span className="pill success">Live</span>
          <strong>Dispatch health</strong>
          <p>96% of jobs scheduled for the next 6 hours are covered.</p>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div>
            <p className="eyebrow">Service operations</p>
            <h2>Mobile service command center</h2>
          </div>
          <div className="topbar-actions">
            <button type="button" className="secondary-btn">Today</button>
            <button type="button" className="primary-btn">New service call</button>
          </div>
        </header>

        {activeTab === 'Overview' && (
          <>
            <section className="hero panel">
              <div>
                <span className="pill success">Operational overview</span>
                <h3>Everything is moving smoothly across dispatched routes and field teams.</h3>
              </div>
              <div className="hero-stats">
                <div>
                  <span>Jobs booked</span>
                  <strong>24</strong>
                </div>
                <div>
                  <span>Dispatch score</span>
                  <strong>96%</strong>
                </div>
              </div>
            </section>

            <section className="stats-grid">
              {summaryCards.map((card) => (
                <article key={card.label} className="panel stat-card">
                  <span>{card.label}</span>
                  <strong>{card.value}</strong>
                  <small className={card.tone}>{card.trend}</small>
                </article>
              ))}
            </section>

            <section className="content-grid">
              <article className="panel list-panel">
                <div className="panel-header">
                  <h3>Live job board</h3>
                  <button type="button" className="link-btn">View all</button>
                </div>

                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Job</th>
                        <th>Customer</th>
                        <th>Service</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>ETA</th>
                      </tr>
                    </thead>
                    <tbody>
                      {jobs.map((job) => (
                        <tr key={job.id} onClick={() => setSelectedJobId(job.id)} className={job.id === selectedJobId ? 'selected-row' : ''}>
                          <td>{job.id}</td>
                          <td>{job.customer}</td>
                          <td>{job.service}</td>
                          <td><span className={priorityClass[job.priority]}>{job.priority}</span></td>
                          <td><span className={statusClass[job.status]}>{job.status}</span></td>
                          <td>{job.eta}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>

              <article className="panel side-panel">
                <div className="panel-header">
                  <h3>Today's schedule</h3>
                  <button type="button" className="link-btn">Plan</button>
                </div>
                <div className="schedule-list">
                  {dispatchSchedule.map((item) => (
                    <div key={item.time} className="schedule-item">
                      <time>{item.time}</time>
                      <div>
                        <strong>{item.title}</strong>
                        <span>{item.tech}</span>
                        <small>{item.detail}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </section>
          </>
        )}

        {activeTab === 'Jobs' && (
          <section className="job-view">
            <div className="panel jobs-panel">
              <div className="panel-header">
                <h3>Work orders</h3>
                <div className="filter-group">
                  {['All', 'On route', 'Awaiting parts', 'Quote sent', 'In progress'].map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      className={statusFilter === filter ? 'filter-btn active' : 'filter-btn'}
                      onClick={() => setStatusFilter(filter)}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              <div className="jobs-grid">
                {filteredJobs.map((job) => (
                  <button key={job.id} type="button" className={selectedJobId === job.id ? 'job-card selected-card' : 'job-card'} onClick={() => setSelectedJobId(job.id)}>
                    <div className="job-card-top">
                      <span className="job-id">{job.id}</span>
                      <span className={priorityClass[job.priority]}>{job.priority}</span>
                    </div>
                    <strong>{job.customer}</strong>
                    <p>{job.service}</p>
                    <div className="job-meta">
                      <span>{job.technician}</span>
                      <span>{job.eta}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <aside className="panel detail-panel">
              <div className="panel-header">
                <h3>Job detail</h3>
                <button type="button" className="primary-btn compact" onClick={handleQuickAssign}>Assign</button>
              </div>

              <div className="detail-header">
                <span className="job-id large">{selectedJob.id}</span>
                <span className={priorityClass[selectedJob.priority]}>{selectedJob.priority}</span>
              </div>

              <div className="detail-list">
                <div><label>Customer</label><strong>{selectedJob.customer}</strong></div>
                <div><label>Service</label><strong>{selectedJob.service}</strong></div>
                <div><label>Address</label><strong>{selectedJob.address}</strong></div>
                <div><label>Technician</label><strong>{selectedJob.technician}</strong></div>
                <div><label>Status</label><strong>{selectedJob.status}</strong></div>
                <div><label>Value</label><strong>{`$${selectedJob.amount.toLocaleString()}`}</strong></div>
              </div>
            </aside>
          </section>
        )}

        {activeTab === 'Dispatch' && (
          <section className="dispatch-view">
            <div className="panel route-panel">
              <div className="panel-header">
                <h3>Route optimization</h3>
                <button type="button" className="secondary-btn">Regenerate</button>
              </div>
              <div className="route-rows">
                {dispatchSchedule.map((item) => (
                  <div key={item.time} className="route-row">
                    <span>{item.time}</span>
                    <div>
                      <strong>{item.title}</strong>
                      <small>{item.detail}</small>
                    </div>
                    <em>{item.tech}</em>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel map-panel">
              <div className="panel-header">
                <h3>Field map</h3>
                <button type="button" className="link-btn">Live</button>
              </div>
              <div className="map-grid">
                <div className="map-node node-blue">Northside</div>
                <div className="map-node node-green">Downtown</div>
                <div className="map-node node-orange">Harbor</div>
                <div className="map-node node-purple">Midtown</div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'Customers' && (
          <section className="customer-view">
            <div className="panel customer-panel">
              <div className="panel-header">
                <h3>Customer accounts</h3>
                <button type="button" className="primary-btn compact">Add customer</button>
              </div>
              <div className="customer-list">
                {customers.map((customer) => (
                  <div key={customer.name} className="customer-card">
                    <div>
                      <strong>{customer.name}</strong>
                      <p>{customer.service}</p>
                    </div>
                    <div className="customer-meta">
                      <span>{customer.status}</span>
                      <strong>{customer.value}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeTab === 'Invoices' && (
          <section className="invoice-view">
            <div className="panel invoice-panel">
              <div className="panel-header">
                <h3>Finance overview</h3>
                <button type="button" className="secondary-btn">Export</button>
              </div>
              <div className="invoice-cards">
                {invoices.map((invoice) => (
                  <div key={invoice.label} className={`invoice-card ${invoice.tone}`}>
                    <span>{invoice.label}</span>
                    <strong>{invoice.amount}</strong>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeTab === 'Team' && (
          <section className="team-view">
            <div className="panel team-panel">
              <div className="panel-header">
                <h3>Technician roster</h3>
                <button type="button" className="link-btn">Sync</button>
              </div>
              <div className="team-grid">
                {technicians.map((tech) => (
                  <div key={tech.name} className="tech-card">
                    <div className="tech-head">
                      <div>
                        <strong>{tech.name}</strong>
                        <small>{tech.specialty}</small>
                      </div>
                      <span className={tech.status === 'Available' ? 'availability ok' : 'availability'}>{tech.status}</span>
                    </div>
                    <div className="tech-bottom">
                      <span>{tech.route}</span>
                      <strong>{tech.rating}★</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <aside className="panel insights-panel">
          <div className="panel-header">
            <h3>Operations feed</h3>
            <button type="button" className="link-btn">Refresh</button>
          </div>
          <ul className="feed-list">
            {activityFeed.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      </main>
    </div>
  );
}

export default App;
