const app = new Vue({
    el: '#app',
    data: {
      data: [],
      locations: [],
      currentPage: 0,
      currentLocation: '',
      pages: 0,
    },
    methods: {
      getUniqueList() {
        const locations = new Set(); // 使用 ES6 中的 set() 取出唯一值
        this.data.forEach((item, i) => {
          locations.add(item.Zone)
        })
        this.locations = Array.from(locations);
      }
    },
    computed: {
      filterData() {
        const newData = []
        const vm = this
        let items = []
        // 過濾地點
        if (vm.currentLocation !== '') {
          items = vm.data.filter((item, i) => item.Zone === vm.currentLocation)
        } else {
          items = vm.data
        }
        // 分頁製作
        items.forEach((item, i) => {
          if (i % 10 === 0) {
            newData.push([])
          }
          const page = parseInt(i / 10)
          newData[page].push(item)
        })
        vm.pages = newData.length // 分頁數量
        vm.currentPage = 0
        return newData
      },
    },
    created() {
      const vm=this;
    axios
      .get("https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json")
      .then(function (response) {
        console.log(response);
        console.log(vm);
        vm.data=response.data.result.records;
        console.log(vm.data);
        vm.geyUniqueList();
      })
      .catch(function (error) {
        console.log(error);
      });
  },
});
  
    
        
    
