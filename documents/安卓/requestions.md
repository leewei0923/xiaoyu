---
title: 问题记录以及解答
tags: [安卓, andorid问题记录]
authors: leewei
---



### 配置安卓手机振动

```
// 2022.01.27
一、配置震动授权

1、在AndroidManifest.xml文件中添加<manifest></manifest>中添加一行

<uses-permission android:name="android.permission.VIBRATE"></uses-permission>
二、在代码页中添加引用

import android.os.Vibrator;
三、在代码段中添加语句

Vibrator v = (Vibrator) getSystemService(Context.VIBRATOR_SERVICE);
　　// 震动0.5秒
　　v.vibrate(500);
```



### [setBackgroundResource和setImageResource的区别](https://www.cnblogs.com/caoxinyu/p/10568714.html)

setBackgroundResource是设置view的背景图片
setImageResource是设置ImageView的图片

对于一个imagevewButton来说，你既可以setBackgroundResource也可以setImageResource。



setBackgroundResource，可能会变形程度较大，setImageResource，可能变形程度较小。



### 尽量避免在java代码中过多使用view.setBackgroundResource()

https://www.jianshu.com/p/0119c3699a53



### 给按钮增加音效



```java
public class MainActivity extends AppCompatActivity implements View.OnClickListener {
 
  private Button btnPlay;
 
  private SoundPool soundPool;//声明一个SoundPool
  private int soundID;//创建某个声音对应的音频ID
 
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_home);
    btnPlay = (Button) findViewById(R.id.btnPlay);
    btnPlay.setOnClickListener(this);
    initSound();
  }
 
  @SuppressLint("NewApi")
  private void initSound() {
    soundPool = new SoundPool.Builder().build();
    soundID = soundPool.load(this, R.raw.testsong, 1);
  }
 
  @Override
  public void onClick(View v) {
    switch (v.getId()) {
      case R.id.btnPlay:
        playSound();
        break;
    }
  }
 
  private void playSound() {
    soundPool.play(
        soundID,
        0.1f,   //左耳道音量【0~1】
        0.5f,   //右耳道音量【0~1】
        0,     //播放优先级【0表示最低优先级】
        1,     //循环模式【0表示循环一次，-1表示一直循环，其他表示数字+1表示当前数字对应的循环次数】
        1     //播放速度【1是正常，范围从0~2】
    );
  }
}
```



### [SuppressLint在android中的含义](https://www.cnblogs.com/906327724qq/p/13372672.html)

在 Android 代码中， 有时会使用比我们在AndroidManifest中设置的android:minSdkVersion版本更高的方法，此时编译器会提示警告，解决方法是在方法上加上@SuppressLint("NewApi"）或者@TargetApi()。

@SuppressLint("NewApi"）屏蔽一切新api中才能使用的方法报的android lint错误

@TargetApi() 只屏蔽某一新api中才能使用的方法报的android lint错误



### 安卓12无法安装应用

当我们的应用以Android 12为目标，使用的activity，service，broadcast receiver含有intent-filter，则必须显示声明android:exported属性，如果没有声明，则我们的应用不能安装在Android 12上

解决方法：
声明android:exported属性即可解决。

只需要对ShareOpenTestActivity增加android:exported属性申明就好

```xml
    <activity android:name=".ShareOpenTestActivity" android:exported="true">
        <intent-filter>
            <action android:name="android.intent.action.SEND"/>
            <category android:name="android.intent.category.DEFAULT" />
            <data android:mimeType="text/*" />
        </intent-filter>
    </activity>
```


### Android 实现计时器


```java
public class MainActivity extends AppCompatActivity  {
    private TextView textView;
    private int count = 100;

    /**
     *      不断 接收 信号
     */
    
    private Handler handler = new Handler(){
        public void handleMessage(Message msg){
            switch (msg.what){
                case 1:
                    textView.setText(String.valueOf((int) msg.obj));            //修改UI组件
                    break;
                    default:
                        break;
            }
        }
    };
    
    /**
     *      不断 发送 信号出去
     */
    Timer timer = new Timer();
    TimerTask task = new TimerTask() {
        @Override
        public void run() {
            if (count > 0){
                count--;
            }else {
                destroyTimer();         //  计时完成后，销毁计时线程
            }
            Message message = new Message();    //  创建 message 对象
            message.what = 1;               //  将 1 存到 what 中，并将其作为 Handler 的switch开关语句的 case 启动标识
            message.obj = count;            //  将count存在message的obj中
            handler.sendMessage(message);   //  将 Message 对象发送出去
        }
    };
    
    //  销毁计时器线程
    private void destroyTimer() {
        if (timer != null){
            timer.cancel();
            timer = null;
        }
    }
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        textView = findViewById(R.id.tv_am);
        timer.scheduleAtFixedRate(task,1000,1000);          //  启动计时器
    
    }

}
```





### 打开界面播放音乐



```java
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import com.llkan.R;

import android.content.Context;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.media.SoundPool;

/**
 * 声音控制类
 * @author wyf
 *
 */
public class SoundPlayer {

	private static MediaPlayer music;
	private static SoundPool soundPool;
	
	private static boolean musicSt = true; //音乐开关
	private static boolean soundSt = true; //音效开关
	private static Context context;
	
	private static final int[] musicId = {R.raw.bg,R.raw.bg1,R.raw.bg2,R.raw.bg3};
	private static Map<Integer,Integer> soundMap; //音效资源id与加载过后的音源id的映射关系表
	
	/**
	 * 初始化方法
	 * @param c
	 */
	public static void init(Context c)
	{
		context = c;

		initMusic();
		
		initSound();
	}
	
	//初始化音效播放器
	private static void initSound()
	{
		soundPool = new SoundPool(10,AudioManager.STREAM_MUSIC,100);
		
		soundMap = new HashMap<Integer,Integer>();
		soundMap.put(R.raw.itemboom, soundPool.load(context, R.raw.itemboom, 1));
		soundMap.put(R.raw.sel, soundPool.load(context, R.raw.sel, 1));
	}
	
	//初始化音乐播放器
	private static void initMusic()
	{
		int r = new Random().nextInt(musicId.length);
		music = MediaPlayer.create(context,musicId[r]);
		music.setLooping(true);
	}
	
	/**
	 * 播放音效
	 * @param resId 音效资源id
	 */
	public static void playSound(int resId)
	{
		if(soundSt == false)
			return;
		
		Integer soundId = soundMap.get(resId);
		if(soundId != null)
			soundPool.play(soundId, 1, 1, 1, 0, 1);
	}

	/**
	 * 暂停音乐
	 */
	public static void pauseMusic()
	{
		if(music.isPlaying())
			music.pause();
	}
	
	/**
	 * 播放音乐
	 */
	public static void startMusic()
	{
		if(musicSt)
			music.start();
	}
	
	/**
	 * 切换一首音乐并播放
	 */
	public static void changeAndPlayMusic()
	{
		if(music != null)
			music.release();
		initMusic();
		startMusic();
	}
	
	/**
	 * 获得音乐开关状态
	 * @return
	 */
	public static boolean isMusicSt() {
		return musicSt;
	}
	
	/**
	 * 设置音乐开关
	 * @param musicSt
	 */
	public static void setMusicSt(boolean musicSt) {
		SoundPlayer.musicSt = musicSt;
		if(musicSt)
			music.start();
		else
			music.stop();
	}

	/**
	 * 获得音效开关状态
	 * @return
	 */
	public static boolean isSoundSt() {
		return soundSt;
	}

	/**
	 * 设置音效开关
	 * @param soundSt
	 */
	public static void setSoundSt(boolean soundSt) {
		SoundPlayer.soundSt = soundSt;
	}
	
	/**
	 * 发出‘邦’的声音
	 */
	public static void boom()
	{
		playSound(R.raw.itemboom);
	}
}
```

