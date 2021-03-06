import m from 'mithril';

// import MinutesAgendaList from './minutes.agenda.list.jsx';

const MinutesSettingInput = {
    view(ctrl, item) {
        return <section className='form-group'>
            <label htmlFor={item.name} className='col-sm-2 control-label'>{item.label}</label>
            <div className='col-sm-10'>
                <input type={item.type}
                    name={item.name}
                    className='form-control'
                    value={item.value()}
                    oninput={m.withAttr('value', item.value)} />
            </div>
        </section>
    }
};

const MinutesSettingDate = {
    view(ctrl, item) {
        return <section className='form-group'>
            <label htmlFor={item.name} className='col-sm-2 control-label'>{item.label}</label>
            <div className='col-sm-10 date'>
                <input type='text'
                    name={item.name}
                    className='form-control'
                    value={item.value()}
                    oninput={m.withAttr('value', item.value)}
                    config={ctrl.config} />
            </div>
        </section>
    }
};

const MinutesSettingTime = {
    view(ctrl, item) {
        return <section className='form-group'>
            <label htmlFor={item.name} className='col-sm-2 control-label'>{item.label}</label>
            <div className='col-sm-10'>
                <input type='time'
                    name={item.name}
                    className='form-control'
                    list="time-list"
                    value={item.value()}
                    oninput={m.withAttr('value', item.value)}
                    onclick={m.withAttr('value', item.value)}/>
                <datalist id="time-list">
                    <option>00:00</option>
                    <option>00:30</option>
                    <option>01:00</option>
                    <option>01:30</option>
                    <option>02:00</option>
                    <option>02:30</option>
                    <option>03:00</option>
                    <option>03:30</option>
                    <option>04:00</option>
                    <option>04:30</option>
                    <option>05:00</option>
                    <option>05:30</option>
                    <option>06:00</option>
                    <option>06:30</option>
                    <option>07:00</option>
                    <option>07:30</option>
                    <option>08:00</option>
                    <option>08:30</option>
                    <option>09:00</option>
                    <option>09:30</option>
                    <option>10:00</option>
                    <option>10:30</option>
                    <option>11:00</option>
                    <option>11:30</option>
                    <option>12:00</option>
                    <option>12:30</option>
                    <option>13:00</option>
                    <option>13:30</option>
                    <option>14:00</option>
                    <option>14:30</option>
                    <option>15:00</option>
                    <option>15:30</option>
                    <option>16:00</option>
                    <option>16:30</option>
                    <option>17:00</option>
                    <option>17:30</option>
                    <option>18:00</option>
                    <option>18:30</option>
                    <option>19:00</option>
                    <option>19:30</option>
                    <option>20:00</option>
                    <option>20:30</option>
                    <option>21:00</option>
                    <option>21:30</option>
                    <option>22:00</option>
                    <option>22:30</option>
                    <option>23:00</option>
                    <option>23:30</option>
                </datalist>
            </div>
        </section>
    }
};

const MinutesSettingToggle = {
    controller: function(item) {
        this.onclicked = function() {
            item.value(!item.value());
        };
    },
    view(ctrl, item) {
        return <section className='checkbox'>
            <label>
                <input type='checkbox'
                    name={item.name}
                    checked={item.value()}
                    onclick={ctrl.onclicked}/>
                {(() => {
                    if(item.value()) {
                        return item.trueText;
                    } else {
                        return item.falseText;
                    }
                })()}
            </label>
        </section>;
    }
};

const MinutesSettingToggleLabel = {
    view(ctrl, item) {
        return <section className='form-group'>
            <label htmlFor={item.name} className='col-sm-2 control-label'>{item.label}</label>
            <div className='col-sm-10'>
                <MinutesSettingToggle
                    value={item.value}
                    trueText={item.trueText}
                    falseText={item.falseText}
                    name={item.name}/>
            </div>
        </section>
    }
};

const MinutesSettingIsSavedButton = {
    view(ctrl, item) {
        function _clicked() {
            item.isSave(false);
            item.destroy();
        };
        return <section className='form-group'>
            <label htmlFor={item.name} className='col-sm-2 control-label'>{item.label}</label>
            <div className='col-sm-10'>
                <button type='button'
                    name={item.name}
                    className='btn btn-default btn-block'
                    onclick={_clicked}
                    disabled={!item.isSave()}>
                    {(() => {
                        if(item.isSave()) {
                            return item.trueText;
                        } else {
                            return item.falseText;
                        }
                    })()}
                </button>
            </div>
        </section>
    }
};

const MinutesSetting = {
    view(ctrl, setting) {
        function _destroy() {
            setting.destroy();
            m.route('/minutes');
        };
        return <div className='content'>
            <section className='form-horizontal'>
                <h3>基本情報</h3>
                <MinutesSettingInput
                    value={setting.data().title}
                    label='タイトル'
                    type='text'
                    name='minutes-title-input' />
                <MinutesSettingInput
                    value={setting.data().where}
                    label='場所'
                    type='text'
                    name='minutes-where-input' />
                <MinutesSettingInput
                    value={setting.data().secretary}
                    label='書記'
                    type='text'
                    name='minutes-secretary-input' />
                <MinutesSettingDate
                    value={setting.data().day}
                    label='日付'
                    name='minutes-date-input' />
                <MinutesSettingTime
                    value={setting.data().startTime}
                    label='開始時間'
                    name='minutes-startTime-input' />
                <MinutesSettingTime
                    value={setting.data().endTime}
                    label='終了時間'
                    name='minutes-endTime-input' />
                <MinutesSettingIsSavedButton
                    isSave={setting.data().isSave}
                    destroy={setting.destroy}
                    label='議事録の保存'
                    trueText='許可する'
                    falseText='許可しない'/>
                <hr/>
                {/*<h3>議案一覧</h3>
                <MinutesAgendaList
                    data={setting.data}
                    add={setting.add}
                    remove={setting.remove}
                    newTitle={setting.newTitle}/>
                <hr/>*/}
                <h3>議事録の更新</h3>
                <button className='btn btn-default btn-block' onclick={setting.update}>議事録を更新する</button>
                <hr/>
                {(() => {
                    if(setting.data().isSave()) {
                        return [
                            <h3>議事録の保存</h3>,
                            <button className='btn btn-success btn-block' onclick={setting.save}>
                                議事録を保存する
                            </button>,
                            <hr/>
                        ];
                    }
                })()}
                <h3>議事録の削除</h3>
                <p>議事録を削除した場合、修復することはできません。</p>
                <button className='btn btn-danger btn-block' onclick={_destroy}>議事録を削除する</button>
                <hr/>
            </section>
        </div>;
    }
};

export default MinutesSetting;
