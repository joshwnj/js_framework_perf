var app = angular.module('angularApp', []);

app.filter('pmkr.partition', [
    'pmkr.filterStabilize',
    function(stabilize) {

        function partition(arr, size) {
            var newArr = [];
            for (var i=0; i<arr.length; i+=size) {
                newArr.push(arr.slice(i, i+size));
            }
            return newArr;
        }

        return stabilize(partition);

    }
]).factory('pmkr.filterStabilize', [
    'pmkr.memoize',
    function(memoize) {

        function service(fn) {

            function filter() {
            var args = [].slice.call(arguments);
            // always pass a copy of the args so that the original input can't be modified
            args = angular.copy(args);
            // return the `fn` return value or input reference (makes `fn` return optional)
            var filtered = fn.apply(this, args) || args[0];
            return filtered;
            }

            var memoized = memoize(filter);
            return memoized;

        }

        return service;

    }
]).factory('pmkr.memoize', [
    function() {

        function service() {
            return memoizeFactory.apply(this, arguments);
        }

        function memoizeFactory(fn) {
            var cache = {};

            function memoized() {
                var args = [].slice.call(arguments);
                var key = JSON.stringify(args);
                
                if (cache.hasOwnProperty(key)) {
                    return cache[key];
                }

                cache[key] = fn.apply(this, arguments);
                return cache[key];

            }

            return memoized;

        }

        return service;

    }
]);

app.controller('TestController',[
    '$scope',
    function ($scope){
        data = [{"id":"0-ozleii78i6dy4x6r","size":23,"price":853,"face":"( .-. )"},
            {"id":"4-zxw60zq7ivz5xw29","size":30,"price":566,"face":"( ͡° ͜ʖ ͡°)"},
            {"id":"8-4g7u6maubxrbe29","size":23,"price":540,"face":"(\\/)(°,,,°)(\\/)"},
            {"id":"12-nmcjgejjtadu0udi","size":21,"price":146,"face":"(°ロ°)☝"},
            {"id":"16-3g5f7vd2as90be29","size":18,"price":760,"face":"(ʘ‿ʘ)"},
            {"id":"23-p76l87bphgwah5mi","size":40,"price":531,"face":"(ಥ﹏ಥ)"},
            {"id":"27-bh7qjaaccxvzehfr","size":16,"price":500,"face":"(ง'̀-'́)ง"},
            {"id":"31-i3txdgwqwmfv42t9","size":32,"price":610,"face":"(ᵔᴥᵔ)"},
            {"id":"35-whvxksam7ca0pb9","size":31,"price":139,"face":"(⌐■_■)"},
            {"id":"39-imlxg6ogthx2mx6r","size":13,"price":682,"face":"(☞ﾟ∀ﾟ)☞"},
            {"id":"42-9i4hg2y3ypclerk9","size":41,"price":264,"face":"(づ｡◕‿‿◕｡)づ"},
            {"id":"46-5b1rv3djto9lik9","size":29,"price":947,"face":"(｀◔ ω ◔´)"},
            {"id":"50-xymjmsges7kchaor","size":41,"price":849,"face":"=^.^="},
            {"id":"54-x3m43i2kzdijxlxr","size":25,"price":899,"face":"¬_¬"},
            {"id":"58-k8ycibrbvzs0dx6r","size":38,"price":884,"face":"ɳ༼ຈل͜ຈ༽ɲ"},
            {"id":"61-wvesnw800ele4s4i","size":28,"price":549,"face":"ʕ•ᴥ•ʔ"},
            {"id":"65-poz0pgsboyiizfr","size":18,"price":402,"face":"ʘ‿ʘ"},
            {"id":"69-s6pt7qg3m41dzpvi","size":17,"price":395,"face":"ب_ب"},
            {"id":"73-k7bp03tes21q0k9","size":16,"price":754,"face":"ಠ~ಠ"},
            {"id":"77-2h8d50ksnlj46lxr","size":22,"price":187,"face":"ರ_ರ"},
            {"id":"80-7j4r6mfa40wwmi","size":15,"price":780,"face":"༼ ºººººل͟ººººº ༽"},
            {"id":"84-7aypbexagkmg3nmi","size":18,"price":301,"face":"༼ ͡■ل͜ ͡■༽"},
            {"id":"88-oi4tzeapkrlwstt9","size":19,"price":867,"face":"ლ(́◉◞౪◟◉‵ლ)"},
            {"id":"92-ufv1h4ep7z6ez5mi","size":26,"price":6,"face":"ᕕ( ᐛ )ᕗ"},
            {"id":"96-2y7gfyg3saotuik9","size":37,"price":269,"face":"‎‎(ﾉಥ益ಥ）ﾉ"},
            {"id":"1-qyam0j7xzu1pp66r","size":31,"price":898,"face":"( .o.)"},
            {"id":"5-f0k89lbck1zzd7vi","size":25,"price":14,"face":"( ⚆ _ ⚆ )"},
            {"id":"9-z7szaihw9cxlayvi","size":26,"price":187,"face":"(¬_¬)"},
            {"id":"13-tfbdobttq1hpk3xr","size":34,"price":379,"face":"(´・ω・)っ"},
            {"id":"17-tm9hnrz6ltu1h5mi","size":15,"price":789,"face":"(̿▀̿ ̿Ĺ̯̿̿▀̿ ̿)̄"},
            {"id":"20-e9j8jcqm8rw45cdi","size":21,"price":989,"face":"(ಠ‿ಠ)"},
            {"id":"24-pad2h31kfcvoyldi","size":13,"price":495,"face":"(ง ͠° ͟ل͜ ͡°)ง"},
            {"id":"28-155kx18zcy9icnmi","size":21,"price":547,"face":"(ง°ل͜°)ง"},
            {"id":"32-40xulj45wpix80k9","size":28,"price":510,"face":"(•ω•)"},
            {"id":"36-w0j2kw7ntwsfko6r","size":37,"price":613,"face":"(─‿‿─)"},
            {"id":"43-xamxanzvhy7xecdi","size":27,"price":447,"face":"(ノಠ益ಠ)ノ"},
            {"id":"47-ibcimyx84x869a4i","size":36,"price":719,"face":"(｡◕‿‿◕｡)"},
            {"id":"51-wi5l8donzcdz33di","size":14,"price":700,"face":"t(-.-t)"},
            {"id":"55-25930438dm42t9","size":40,"price":421,"face":"¯(°_o)/¯"},
            {"id":"59-99yotcjphh2p4x6r","size":36,"price":475,"face":"ʅʕ•ᴥ•ʔʃ"},
            {"id":"62-k9g5zqlh5kjiqkt9","size":39,"price":970,"face":"ʕ◉.◉ʔ"},
            {"id":"66-93nur6dv8ejkmx6r","size":29,"price":954,"face":"͡° ͜ʖ ͡°"},
            {"id":"70-wadiioizcoh41jor","size":28,"price":774,"face":"٩◔̯◔۶"},
            {"id":"74-zksjbnm19bj1nhfr","size":37,"price":446,"face":"ಠ‿ಠ"},
            {"id":"78-7ubwflfmrilwstt9","size":14,"price":680,"face":"ง ͠° ل͜ °)ง"},
            {"id":"81-yjarl9ux6ed34n29","size":38,"price":590,"face":"༼ ºل͟º ༽"},
            {"id":"85-tb4tec8a364gf1or","size":34,"price":282,"face":"༼ つ ◕_◕ ༽つ"},
            {"id":"89-buhmwy0mc28x5hfr","size":27,"price":866,"face":"ლ(ಠ益ಠლ)"},
            {"id":"93-ipg5il3dmszto6r","size":24,"price":855,"face":"ᕙ(⇀‸↼‶)ᕗ"},
            {"id":"97-lkbt56no8qjpds4i","size":34,"price":821,"face":"≧☉_☉≦"},
            {"id":"2-eez92gmcjf7uv7vi","size":24,"price":938,"face":"( `·´ )"},
            {"id":"6-ub24kyuka8bedn29","size":21,"price":744,"face":"( ︶︿︶)"},
            {"id":"10-qq6alnn4mio7ds4i","size":22,"price":752,"face":"(¬º-°)¬"},
            {"id":"14-ytdrzrf4gi90ms4i","size":24,"price":949,"face":"(ó ì_í)"},
            {"id":"18-68f9y2cpw8iod2t9","size":40,"price":258,"face":"(͡° ͜ʖ ͡°)"},
            {"id":"21-r06epat0nfsnstt9","size":39,"price":414,"face":"(ಠ⌣ಠ)"},
            {"id":"25-gx6ugo8rhqrjatt9","size":27,"price":68,"face":"(ง ͡ʘ ͜ʖ ͡ʘ)ง"},
            {"id":"29-d2cziiz9cc8fr","size":18,"price":657,"face":"(ง⌐□ل͜□)ง"},
            {"id":"33-vwtbgntxagb0ggb9","size":36,"price":889,"face":"(•◡•)/"},
            {"id":"37-j3l4f71jttltbj4i","size":14,"price":54,"face":"(╯°□°）╯"},
            {"id":"40-4il32o1psn4mfgvi","size":18,"price":749,"face":"(❍ᴥ❍ʋ)"},
            {"id":"44-ij3wp7kd0io1or","size":22,"price":363,"face":"(ノ・∀・)ノ"},
            {"id":"48-qhpzgf2avhxv42t9","size":20,"price":381,"face":"(ﾉ◕ヮ◕)ﾉ"},
            {"id":"52-zjnomg6o8wryhkt9","size":12,"price":428,"face":"| (• ◡•)|"},
            {"id":"56-th8jeea9lbfyldi","size":38,"price":169,"face":"¯_(ツ)_/¯"},
            {"id":"63-llkmnip8qwcanhfr","size":30,"price":741,"face":"ʕㅇ호ㅇʔ"},
            {"id":"67-yo71whecqrc6jemi","size":23,"price":80,"face":"ζ༼Ɵ͆ل͜Ɵ͆༽ᶘ"},
            {"id":"71-i4ncsv8adejexw29","size":15,"price":282,"face":"ಠ_ಠ"},
            {"id":"75-l9e936lgb3ayvi","size":18,"price":969,"face":"ಠ⌣ಠ"},
            {"id":"79-2jki6sclh1960f6r","size":16,"price":91,"face":"๏̯͡๏﴿"},
            {"id":"82-eeav6h0eed1pds4i","size":38,"price":318,"face":"༼ ºل͟º༼"},
            {"id":"86-ssg4ujxhzzn6ogvi","size":12,"price":737,"face":"༼ʘ̚ل͜ʘ̚༽"},
            {"id":"90-kzvqhggquflgnwmi","size":41,"price":312,"face":"ᄽὁȍ ̪őὀᄿ"},
            {"id":"94-jicleorsbjspds4i","size":14,"price":217,"face":"ᕙ༼ຈل͜ຈ༽ᕗ"},
            {"id":"98-c3wl8bc71vdholxr","size":17,"price":858,"face":"⊙▃⊙"},
            {"id":"3-i0vqvgfdsub1q0k9","size":14,"price":813,"face":"( ° ͜ ʖ °)"},
            {"id":"7-jwsecaqpo2hxs9k9","size":22,"price":318,"face":"( ﾟヮﾟ)"},
            {"id":"11-zifjnwvsvli0be29","size":40,"price":635,"face":"(¬‿¬)"},
            {"id":"15-opjf7001ggj2x1or","size":21,"price":807,"face":"(ʘᗩʘ')"},
            {"id":"19-eqsm68k3ud9ggb9","size":21,"price":898,"face":"(ಠ_ಠ)"},
            {"id":"22-xawcut5yaqugnwmi","size":32,"price":400,"face":"(ಥ_ಥ)"},
            {"id":"26-2ap15hfdzgz4zpvi","size":17,"price":190,"face":"(ง •̀_•́)ง"},
            {"id":"30-avqken2y1tf0f6r","size":36,"price":106,"face":"(ღ˘⌣˘ღ)"},
            {"id":"34-o9m1c4hqu102j4i","size":23,"price":323,"face":"(⊙ω⊙)"},
            {"id":"38-m3kolyjzdkc07ldi","size":25,"price":1000,"face":"(◕‿◕)"},
            {"id":"41-3wm54ml2pam7vi","size":14,"price":476,"face":"(っ◕‿◕)っ"},
            {"id":"45-8db937yuwwqrrudi","size":24,"price":124,"face":"(；一_一)"},
            {"id":"49-4csgx4t7nznf80k9","size":26,"price":433,"face":"*<{:¬{D}}}"},
            {"id":"53-hy42k0g73oc4n29","size":39,"price":786,"face":"~(˘▾˘~)"}]

        $scope.data = data;
        this.addData = function(column_count){
            return column_count;
        };
    }
]);