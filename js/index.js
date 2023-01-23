$(document).ready(() => {
  const vm = {
    ...new Tithis(),
    ...new Nakshatras(),
    showTemple: ko.observable(false),
    toggleTemple: () => {
      vm.showTemple(!vm.showTemple());
    },
  };
  ko.applyBindings(vm, $('body')[0]);
});
