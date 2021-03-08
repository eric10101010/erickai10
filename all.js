
const app = new Vue({
    el: '#app',
    data: {
      data: [],
      locations: [],
      currentPage: 0,
      currentLocation: '',
   
    },
    computed: {
      filterData() {
        const vm = this
        let items = []
        // 過濾地點
        if (vm.currentLocation !== '') {
          items = vm.data.filter((item, i) => item.Zone === vm.currentLocation)
        } else {
          items = vm.data
        }
        // 分頁製作
        const newData=[];
        console.log(vm.currentLocation)
        items.forEach(function(item,i){
            if(i % 10 === 0){
                newData.push([])
            }
            const page=parseInt(i/10);
            newData[page].push(item)
        })
        console.log(newData);
        return newData;
    }
    },
    methods: {
      geyUniqueList(){
    
          const vm=this;
          const locations =new Set();//ES6 set讓資料不得重複
          vm.data.forEach(function(item,i){
              locations.add(item.Zone);
          })
          console.log(locations);
          vm.locations=Array.from(locations);
      }
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
  
  