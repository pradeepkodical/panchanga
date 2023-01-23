class Navbar {}

ko.components.register('hss-panchanga-navbar', {
  viewModel: Navbar,
  template: `<div class="nav-menu">
    <a href="heliocentric.html">Helio centric</a>
    <a href="geocentric.html">Geo centric</a>
    <a href="nakshatra.html">Geo centric - stars</a>
    <a href="planets.html">Geo centric - planets</a>
  </div>`,
});

class Topbar {
  nodes;
  constructor(p, n) {
    this.nodes = n;
  }
}

ko.components.register('hss-panchanga-topbar', {
  viewModel: Topbar,
  template: `<div class="tithi-header">
  <div style="display: flex; align-items: center; padding: 0 24px">
    <a href="index.html"><img src="images/hss.png" height="60px" /></a>
    <a href="index.html"> <h2 class="title hidden-sm"> HSS - Panchanga - Tithi</h2> </a>
    <div class="x-items" data-bind="template: {nodes: nodes}"></div>
  </div>
</div>`,
  viewModel: {
    createViewModel: (params, componentInfo) => {
      return new Topbar(params, componentInfo.templateNodes);
    },
  },
});
