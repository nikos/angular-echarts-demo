import { Component } from '@angular/core';
import { fromEvent, debounceTime } from 'rxjs';

@Component({
  selector: 'hello',
  templateUrl: `./hello.component.html`,
  styles: [`h1 { font-family: Lato; }`],
})
export class HelloComponent {
  echartsIntance: any;

  options: any;
  constructor() {
    this.resize();
  }

  ngOnInit(): void {
    const xAxisData = [];
    const data1 = [];
    const data2 = [];

    for (let i = 0; i < 100; i++) {
      xAxisData.push('category' + i);
      data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }

    this.options = {
      backgroundColor: 'rgb(240,240,240)',
      color: ['purple', 'green'],
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
      legend: {
        data: ['orders', 'transactions'],
        align: 'left',
        borderWidth: 0,
        borderRadius: 0,
        textStyle: {
          color: 'red',
        },
      },
      /*
      toolbox: {
        // y: 'bottom',
        feature: {
          magicType: {
            type: ['stack'],
          },
          dataView: {},
          saveAsImage: {
            pixelRatio: 2,
          },
        },
      },
      */
      //      tooltip: {},
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        textStyle: {
          color: 'orange',
          fontWeight: '100',
          fontSize: '12',
        },
        position: 'top',
        backgroundColor: 'white',
        borderColor: 'transparent',
        borderWidth: 0,
        formatter: (params) => `${Math.round(parseInt(params[0].value, 10))}`,
        //extraCssText: 'blue',
      },
      xAxis: {
        data: xAxisData,
        silent: false,
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        axisTick: {
          show: false,
        },
      },
      yAxis: {
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: 'orange',
            opacity: '0.2',
            width: '5',
          },
        },
      },
      series: [
        {
          name: 'transactions',
          type: 'bar',
          data: data1,
          animationDelay: function (idx) {
            return idx * 10;
          },
        },
        {
          name: 'orders',
          type: 'bar',
          data: data2,
          animationDelay: function (idx) {
            return idx * 10 + 100;
          },
        },
      ],
      //      animationDuration: 0,
      //    animationDurationUpdate: 3000,
      //  animationDuration: 100,
      animationEasing: 'elasticOut',
      animationDelayUpdate: function (idx) {
        return idx * 5;
      },
    };
  }

  resize() {
    fromEvent(window, 'resize')
      .pipe(debounceTime(200))
      .subscribe((e) => {
        console.log('RESIZE');
        if (this.echartsIntance) {
          this.echartsIntance.resize({
            animation: {
              duration: 1500,
              easing: 'elasticOut',
            },
          });
        }
      });
  }

  onChartInit(echarts) {
    this.echartsIntance = echarts;
  }
}
