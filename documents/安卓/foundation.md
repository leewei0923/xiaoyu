---
title: 01-基础
tags: [安卓]
authors: leewei
---

## TextView

```
基础属性详解
layout_width: 组件的宽度
layout_height: 组件的高度
id: 为TextView设置一个组件id
text: 设置显示的文本内容
textColor: 设置字体颜色
textStyle: 设置字体风格,三个可选值,normal(无效果),blod(加粗),italic(斜体)
textSize: 字体大小,单位一般是用sp
background: 控件的背景颜色,可以理解为填充这个空间的颜色,可以是图片
gravity: 设置控件中的内容的对齐方向,TextView中是文字,ImageView是图片
```



### 实现带阴影的TextView

```
1. android:shadowColor: 设置带阴影颜色,需要与shadowRadius一起使用
2. android:shadowRadius: 设置阴影的模糊程度,设为0.1就变成字体颜色,建议使用3.0
3. android:shadowDx: 设置阴影在水平方向的偏移,就是水平方向阴影的开始的横坐标位置
4. android:shadowDy: 设置阴影在竖值方向的偏移,就是竖直方向阴影开始的纵坐标位置
```

### 实现跑马灯效果

```
1. android:singleList: 内容单行显示
1. android:focusable: 是否可以获取焦点
1. android:focusableInTouchMode: 用于控制视图在触摸模式下是否可以聚焦
1. android:ellipsize: 在哪里省略文本
1. android:margqueeRepeatLimit: 字幕动画重复的次数
```



## Button

### StateListDrawable

```
StateListDrawable 是Drawable资源的一种，可以根据不同的状态，设置不同的图片效果，挂火箭节点<selector>我们只需要将Button的background属性设置为该drawable资源即可轻松实现,按下按钮时不同的按钮颜色或背景

1. drawable: 引用的Drawable位图
2. state_focused是否获得焦点
3. state_pressed: 控件是否被按下
4. state_enabled: 控件是否可用 
5. state_selected: 控件是否被选择,针对有滚轮的情况 
6. state_checked: 控件是否被勾选 
7. state_checkable: 控件可否被勾选
---------------------------------- 
8. state_window_focused: 是否获得窗口焦点 
9. state_active: 控件是否处于活动状态 
10. state_single: 控件包含多个子控件,确定是否值显示一个子控件
11. state_first:  控件包含多个子控件时,确定第一个子控件是否处于显示状态
12. state_middle: 控件包含多个子控件时,确定中间一个子控件是否处于显示状态
13. state_last: 控件包含多个子控件时,确定最后一个子控件是否处于显示状态
```





### Button 事件处理



```
步骤: 
1. 给button 添加id
```

```java
Button btn = findViewById(R.id.btn);
        // 点击事件
        btn.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {
                Log.e(TAG, "onClick");
            }
        });

        // 长按事件
        btn.setOnLongClickListener(new View.OnLongClickListener() {
            @Override
            public boolean onLongClick(View v) {
                Log.e(TAG, "onLongClick");
                return false; // 为true 调用 onClick 不会被执行
            }
        });

        // 触摸事件
        btn.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent event) {
                Log.e(TAG, "onTouch" + event.getAction());

                return true; // 为true 被onTouch销毁了不再传给onClick 和onLongClick
            }
        });
```

方法二

在xml中添加`onClick`  再`alt` + `enter`

[android Button隐藏](https://www.cnblogs.com/sudawei/p/3431732.html)

两种方式：

xml方式 和 java代码方式：

 

**可见（visible)**

XML文件：android:visibility="visible"

Java代码：view.setVisibility(View.VISIBLE);

 

**不可见（invisible）**

XML文件：android:visibility="invisible"

Java代码：view.setVisibility(View.INVISIBLE);

 

**隐藏（GONE）**

XML文件：android:visibility="gone"

Java代码：view.setVisibility(View.GONE);



## EditText

### 主要属性

```
1. android:hint : 输入提示
2. android:textColorHint: 输入提示文字的颜色
3. android:inputType: 输入类型
4. android:drewableXxx : 在输入的摸个指定方位添加图片
5. android:drawablePadding: 设置图片与输入内容的间距
6. android:paddingXxx: 设置内容与边框的间距
7. android:background: 背景色
```



## ImageView

### 主要属性

```
1. android:src 设置图片资源
2. android:scaleType: 设置图片缩放类型
	- fitStart 保持宽高比缩放图片，直到较长的边与Image的边长相等，缩放完成后将图片放在ImageView的左上角
	- fitCenter 默认值，同上，缩放后放于中间
	- fitEnd 同上，缩放后放于右下角
	- fitXY 对图像的横纵方向进行独立缩放，使得该图片完全适应ImageView，但是图片的宽高比可能会发生改变、
	- center 保持原图的大小，显示在ImageView的中心，当原图size大于ImageView的size，超过部分裁剪处理
	- centerCrop 保持宽高比缩放图片，直到完全覆盖ImageView，可能会出现图片显示不完全。
	- centerInside 保持宽高比图片，直到ImageView能够完全地显示图片
	- matrix 不改变原图的大小，从ImageView的左上角开始绘制原图，原图超过ImageView的部分作裁剪处理
3. android:maxHeight  最大高度
4. android:maxWidth	最大宽度
5. android:adjustViewBounds	调整View的界限
```



## ProgressBar

```
1. android:max 进度条最大值
2. android:progress  进度条已完成进度条
3. android:indeterminate  如果设置成true,则进度条不精确显示进度
4. style="?android:attr/progressBarStyleHorizontal" 水平进度条
```

```xml
<ProgressBar
        android:id="@+id/pb"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        />

    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="显示隐藏"
        android:onClick="toggleClick"
        />

    <ProgressBar
        android:id="@+id/pb2"
        android:layout_width="300dp"
        android:layout_height="wrap_content"
        android:max="100"
        style="?android:attr/progressBarStyleHorizontal"
        />

    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="增加"
        android:onClick="addClick"
        />
```



```java
public void toggleClick (View view) {

         if(progressBar.getVisibility() == View.GONE) {
             progressBar.setVisibility(View.VISIBLE);
             Log.e("显示", "toggleClick: 显示");
         } else {
             progressBar.setVisibility(View.GONE);
             Log.e("显示", "toggleClick: 隐藏");
         }
        }


        public void  addClick (View view) {

            int progress = progressBar2.getProgress();
            progress += 10;

            progressBar2.setProgress(progress);
        }
```







## Notification



### Notification 与 NotificationManager

- 创建一个NotificationManager

NotificationManager 类是一个通知管理器类，这个对象是由系统维护的服务，是以单例模式的方式获得，随意一般并不直接实例化这个对象。在Activity中，可以使用Activity。getSystemService(String)方法获取NotificationManager对象，Activity。getSystemServic(String)方法可以通过Android系统级服务的句柄,返回对应的对象,这里需要返回NotificationManager，所以直接传递Context.NOTIFICATION_SERVICE即可。

- 使用Builder构造器来创建Notification对象

使用NotificationCompat类的Builder构造器来创建Notification对象，可以保证程序在所有的版本上都可以正常工作，Android8.0新增通知渠道，没有设置无法在Android8.0上使用



### NotificationChannel

通知渠道 Android 8.0 引入了通知渠道,其允许为要显示的每种通知类型创建用户可自定义的渠道



通知重要程度设置,NotificationManager类中

- IMPORTANCE_NONE 关闭通知
- IMPORTANCE_MIN 开启通知, 不会弹出, 但没有提示音, 状态栏无显示
- IMPORTANCE_LOW 开启通知 不会弹出 不发出提示音, 状态栏显示
- IMPORTANCE_DEFAULT 开启通知 不会弹出 发出提示音 状态栏中显示
- IMPORTANCE_HIGH 开启通知 会弹出 发出提示音, 状态栏显示



### 常见方法说明

```
1. setContentTitle(String string) 设置标题
2. setContentText(String string) 设置文本内容
3. setSmallIcon(int icon) 设置小图标
4. setLargeIcon(Bitmap icon) 设置通知的大图标
5. setColor(int argb) 设置小图标的颜色
6. setContentInternet(pendingInternet Internet) 设置点击通知后的跳转意图
7. setAutoCancel(boolean boolean) 设置点击通知后自动清除通知
8. setWhen(long when) 设置通知被创建的时间
```

```xml
// 触发按钮
<Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="发出通知"
        android:onClick="sendNotification"/>
    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="取消通知"
        android:onClick="cancelNotification"/>
```



```java
private NotificationManager manager;
private Notification notification;

@Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
        manager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel("lee", "测试通知", NotificationManager.IMPORTANCE_HIGH);
            manager.createNotificationChannel(channel);
        }

        Intent intent = new Intent(this, NotificationActivity.class);
        PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, intent, 0);
        notification = new NotificationCompat.Builder(this, "lee")
                .setContentTitle("官方通知") //标题
                .setContentText("世界那么大我想去看看") //内容
                 .setSmallIcon(R.drawable.ic_add_circle_outline_black_24dp) //小图标
                .setLargeIcon(BitmapFactory.decodeResource(getResources(), R.drawable.mountains)) // 内容图片
                .setColor(Color.parseColor("#ff0000")) // 颜色
                .setContentIntent(pendingIntent) // 进入意图
                .setAutoCancel(true).build();
    }
```



## tooBar

### 常用属性

```
1. android:layout_width="match_parent";
2. android:layout_height="?attr/actionBarSize";
3. android:background="#ffff00";
4. app:navigationIcon=""
5. app:title
6. app:titleTextColor
7. app:titleMariginStart="90dp";
8. app:subtitle="子标题"
9. app:subtitleTextColor="#00ffff"
10. app:logo=""
```



容易出现导包问题

```
import androidx.appcompat.widget.Toolbar; 是这个包
```



```java
Toolbar toolbar = findViewById(R.id.tb);

        toolbar.setNavigationOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Log.e("toolbar", "toolbar被点击了");
            }
        });
```

```xml
<androidx.appcompat.widget.Toolbar
        android:id="@+id/tb"
        android:layout_width="match_parent"
        android:layout_height="?attr/actionBarSize"
        android:background="#EC7259"
        app:navigationIcon="@drawable/ic_keyboard_arrow_left_black_24dp"
        app:titleMarginStart="130dp"
        app:titleTextColor="#ffffff">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_gravity="center_horizontal"
            android:text="首页"
            android:textSize="25dp"
            android:textColor="#ffffff" />
    </androidx.appcompat.widget.Toolbar>
```

```java
Toolbar toolbar = findViewById(R.id.tb);

        toolbar.setNavigationOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Log.e("toolbar", "toolbar被点击了");
            }
        });
```





## AlertDialog 

### 实现方式

```
AlertDialog.Builder = builder = new AlertDialog.Builder(context); 构建Dialog的各种参数
Builder.setIcon(int IconId) 添加Icon
Builder.setTitle(charSequence title);
Builder.setMessage(ChaeSequence title)
Builder.setView(View view); 设置自定义布局
Builder.create(); 创建Dialog
Builder.show(); 显示对话框
setPositiveButtion 确定按钮
setNegativeButton 取消按钮
setNeutralButton 中间按钮
```

```java
public void showDialog(View view) {

     View dialogView = getLayoutInflater().inflate(R.layout.dialog_view,null);
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setIcon(R.drawable.ic_add_circle_outline_black_24dp)
        .setTitle("提示框")
                .setMessage("请确定你输入的内容")
                .setPositiveButton("确定", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        Log.e("dialog", "onClick: 确定");
                    }
                })
                .setNeutralButton("好的", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        Log.e("dialog", "onClick: 好的");
                    }
                })
                .setNegativeButton("取消", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        Log.e("dialog", "onClick: 取消");
                    }
                })
                .setView(dialogView)
                .create()
                .show();
    }
```



## LInearLayout

常见属性

```
1. orientation 布局中组件的排列方式
2. gravity 控制组件所包含的子元素的对齐方式，可多个组合
3. layout_gravity 控制该组件在父容器里的对齐方式
4. background 为该组件设置一个背景图片, 或者是直接用颜色覆盖
5. divider 分割线
6. showDividers 设置分割线所在的位置，none（无） behinning（开始） end 结束 middle 没两个组件之间
7. dividerPadding 设置分割线的padding
8. layout_weight (权重) 该属性是用来等比例的划分区域
```



## RelativelLayout

常见属性

```
根据父容器定位
1. layout_alignParentLeft 左对齐
2. layout_alignParentRight 右对齐
3. layout_alignParentTop 顶部对齐
4. layout_alignParentBottom 底部对齐
5. layout_centerHorizontal 水平居中
5. layout_centerVertical 垂直居中
5. layout_centerInParent 中间居中

根据兄弟组件定位
1. layout_toLeftOf 放置于参考组件的左边
2. layout_toRightOf 放置于参考组件的右边
3. layout_above 放置于参考组件的上方
4. layout_below 放置于参考组件的下方
5. layout_alignTop 对齐参考组件的上边届
6. layout_alignBottom 对齐参考组件的下边界
7. layout_alignLeft 对齐参考组件的左边界

```



## GridLayout



常见属性

````
1. android:orientation 设置水平显示还是垂直显示
2. android:columnColor 设置行的显示个数
3. android:rowColor 设置列的显示个数
````

### 子控件属性

```
1. android:layout_column 显示在第几列
2. android:layout_columnSpan 横向跨几列
3. android:layout_columnWeight 横向剩余空间分配方式
4. android:layout_gravity 在网格中的显示位置
5. android:layout_row 显示在第几行
6. android:layout_rowSpan 横向跨几行
7. android:layout_rowWeight 纵向剩余空间分配方式
```

## Activity

### 跳转activity

```java
startActivity(new Intent(this, MainActivity2.class));
```



### activity 生命周期



```java
   /*
    * 生命周期
    * */

private final String TAG = MainActivity.class.getSimpleName();
    // 重启
    @Override
    protected void onRestart() {
        super.onRestart();
        Log.d(TAG, "onRestart: ");
    }
    
    // 页面展示渲染
    @Override
    protected void onStart() {
        super.onStart();
        Log.d(TAG, "onStart: ");
    }

    

    @Override
    protected void onResume() {
        super.onResume();
        Log.d(TAG, "onResume: ");
    }

    // 画面暂停
    @Override
    protected void onPause() {
        super.onPause();
        Log.d(TAG, "onPause: ");
    }
    
    // 渲染停止

    @Override
    protected void onStop() {
        super.onStop();
        Log.d(TAG, "onStop: ");
    }

    // 页面销毁
    @Override
    protected void onDestroy() {
        super.onDestroy();
        Log.d(TAG, "onDestroy: ");
    }
```



## SP简单使用



### 保存

```java
// 参数1: SP名字
// 参数2: SP保存的时候用的模式 追加(每次保存都会更新), 常规(每次保存就在后面追加) 
// Context.MODE_PRIVATE 常规
// Context.MODE_APPEND 追加
@Override
    public SharedPreferences getSharedPreferences(String name, int mode) {
        return mBase.getSharedPreferences(name, mode);
    }
```



### 获取

```java
SharedPreferences sp = getSharedPreferences("电话号码", Context.MODE_PRIVATE);
       String  values =  sp.getString("phone", "默认值"); // 假如获取的值是空值,返回默认值
        Toast.makeText(this, "" +values, Toast.LENGTH_SHORT).show(); // 提示
```

